import { Request, Response } from "express";
import { Service } from "typedi";
import axios from "axios";
import moment from "moment";

@Service()
export default class OrderService {
  constructor() {}

  public async CreateOrder(req: Request, res: Response) {
    try {
      const options = {
        headers: { "x-api-key": "8hu71URNzm7FCLV9LfDPd9Gz61zN2diV6kG2hDEw" },
      };

      let shippingMethods = await axios.get(
        "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods",
        options
      );
      let shippingMethodsDetail = await axios.get(
        `https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${req.body.shippingMethod}`,
        options
      );
      let offDays = await axios.get(
        "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days",
        options
      );

      // Api variables

      let minWeight =
        shippingMethodsDetail.data.rules.availability.byWeight.min;
      let maxWeight =
        shippingMethodsDetail.data.rules.availability.byWeight.max;

      let dayType =
        shippingMethodsDetail.data.rules.availability.byRequestTime.dayType;
      let fromTimeOfDay =
        shippingMethodsDetail.data.rules.availability.byRequestTime
          .fromTimeOfDay;
      let toTimeOfDay =
        shippingMethodsDetail.data.rules.availability.byRequestTime.toTimeOfDay;
      let promisesParameters =
        shippingMethodsDetail.data.rules.promisesParameters.cases;

      let packPromiseMin: any = null;
      let packPromiseMax: any = null;
      let shipPromiseMin: any = null;
      let shipPromiseMax: any = null;
      let deliveryPromiseMin: any = null;
      let deliveryPromiseMax: any = null;
      let readyPickupPromiseMin: any = null;
      let readyPickupPromiseMax: any = null;

      let date = moment.utc().format("YYYY-MM-DD");
      let internalOrderNumber = `MSE${new Date().getTime()}${Math.round(
        Math.random() * 100
      )}`;

      let promises: any = {
        packPromiseMin: null,
        packPromiseMax: null,
        shipPromiseMin: null,
        shipPromiseMax: null,
        deliveryPromiseMin: null,
        deliveryPromiseMax: null,
        readyPickupPromiseMin: null,
        readyPickupPromiseMax: null,
      };

      // Local variables

      let nowDateTime = moment.utc().format("YYYY-MM-DD");
      let nowTime = moment.utc().format("HH");
      let nowDateIsBusiness = offDays.data.find(
        (res: any) => nowDateTime == res
      )
        ? false
        : true;

      let dateInit = moment(nowDateTime).utc().add(1, "days");
      let nextBussinessDays: any = [];

      let sellOrderWeight = 0;

      let priority = 1;

      //functions

      //get next 10 bussiness days
      while (nextBussinessDays.length <= 9) {
        let findDays = offDays.data.find(
          (noBusiness: any) => noBusiness == dateInit.format("YYYY-MM-DD")
        );
        if (!findDays) {
          nextBussinessDays.push(dateInit.format("YYYY-MM-DD"));
        }
        dateInit.add(1, "days");
      }

      if (req.body.lineItems) {
        req.body.lineItems.map((response: any) => {
          sellOrderWeight += parseInt(response.productWeight);
        });
      }

      if (minWeight <= sellOrderWeight && sellOrderWeight <= maxWeight) {
        if (dayType === "BUSINESS") {
          if (!nowDateIsBusiness) {
            return res.status(200).json({
              status: false,
              code: 200,
              message: "Response",
              data: {
                ...req.body,
                internalOrderNumber,
                date,
                packPromiseMin,
                packPromiseMax,
                shipPromiseMin,
                shipPromiseMax,
                deliveryPromiseMin,
                deliveryPromiseMax,
                readyPickupPromiseMin,
                readyPickupPromiseMax,
              },
            });
          }
        }

        if (fromTimeOfDay <= nowTime && nowTime <= toTimeOfDay) {
          for (let i = 0; i < promisesParameters.length; i++) {
            const cases = promisesParameters[i];

            if (cases.priority === priority) {
              let dayTypeCase = cases.condition.byRequestTime.dayType;
              let fromTimeOfDayCase =
                cases.condition.byRequestTime.fromTimeOfDay;
              let toTimeOfDayCase = cases.condition.byRequestTime.toTimeOfDay;

              if (dayTypeCase === "BUSINESS") {
                if (!nowDateIsBusiness) {
                  priority++;
                  continue;
                }
              }

              if (fromTimeOfDayCase <= nowTime && nowTime <= toTimeOfDayCase) {
                const setPromise = (
                  name: string,
                  nameVariableMin: string,
                  nameVariableMax: string
                ) => {
                  let minTypeCase = cases[name].min.type;
                  let minHoursCase = cases[name].min.deltaHours;
                  let minBusinessDaysCase = cases[name].min.deltaBusinessDays;
                  let minTimeOfDaysCase = cases[name].min.timeOfDay;

                  let maxTypeCase = cases[name].max.type;
                  let maxHoursCase = cases[name].max.deltaHours;
                  let maxBusinessDaysCase = cases[name].max.deltaBusinessDays;
                  let maxTimeOfDaysCase = cases[name].max.timeOfDay;

                  switch (minTypeCase) {
                    case "NULL":
                      promises[nameVariableMin] = null;
                      break;
                    case "DELTA-HOURS":
                      promises[
                        nameVariableMin
                      ] = `${nowDateTime} ${minHoursCase}:00`;
                      break;
                    case "DELTA-BUSINESSDAYS":
                      promises[nameVariableMin] = `${
                        nextBussinessDays[minBusinessDaysCase - 1]
                      } ${minTimeOfDaysCase}:00`;
                      break;
                    default:
                      break;
                  }

                  switch (maxTypeCase) {
                    case "NULL":
                      promises[nameVariableMax] = null;
                      break;
                    case "DELTA-HOURS":
                      promises[
                        nameVariableMax
                      ] = `${nowDateTime} ${maxHoursCase}:00`;
                      break;
                    case "DELTA-BUSINESSDAYS":
                      promises[nameVariableMax] = `${
                        nextBussinessDays[maxBusinessDaysCase - 1]
                      } ${maxTimeOfDaysCase}:00`;
                      break;
                    default:
                      break;
                  }
                };

                setPromise("packPromise", "packPromiseMin", "packPromiseMax");
                setPromise("shipPromise", "shipPromiseMin", "shipPromiseMax");
                setPromise(
                  "deliveryPromise",
                  "deliveryPromiseMin",
                  "deliveryPromiseMax"
                );
                setPromise(
                  "readyPickUpPromise",
                  "readyPickupPromiseMin",
                  "readyPickupPromiseMax"
                );

                return res.status(200).json({
                  status: true,
                  code: 200,
                  message: "Response",
                  data: {
                    ...req.body,
                    internalOrderNumber,
                    date,
                    packPromiseMin: promises.packPromiseMin,
                    packPromiseMax: promises.packPromiseMax,
                    shipPromiseMin: promises.shipPromiseMin,
                    shipPromiseMax: promises.shipPromiseMax,
                    deliveryPromiseMin: promises.deliveryPromiseMin,
                    deliveryPromiseMax: promises.deliveryPromiseMax,
                    readyPickupPromiseMin: promises.readyPickupPromiseMin,
                    readyPickupPromiseMax: promises.readyPickupPromiseMax,
                  },
                });
              } else {
                priority++;
              }
            } else {
              return res.status(200).json({
                status: false,
                code: 200,
                message: "Response",
                data: {
                  ...req.body,
                  internalOrderNumber,
                  date,
                  packPromiseMin,
                  packPromiseMax,
                  shipPromiseMin,
                  shipPromiseMax,
                  deliveryPromiseMin,
                  deliveryPromiseMax,
                  readyPickupPromiseMin,
                  readyPickupPromiseMax,
                },
              });
            }
          }
        } else {
          return res.status(200).json({
            status: false,
            code: 200,
            message: "Response",
            data: {
              ...req.body,
              internalOrderNumber,
              date,
              packPromiseMin,
              packPromiseMax,
              shipPromiseMin,
              shipPromiseMax,
              deliveryPromiseMin,
              deliveryPromiseMax,
              readyPickupPromiseMin,
              readyPickupPromiseMax,
            },
          });
        }
      } else {
        return res.status(200).json({
          status: false,
          code: 200,
          message: "Response",
          data: {
            ...req.body,
            internalOrderNumber,
            date,
            packPromiseMin,
            packPromiseMax,
            shipPromiseMin,
            shipPromiseMax,
            deliveryPromiseMin,
            deliveryPromiseMax,
            readyPickupPromiseMin,
            readyPickupPromiseMax,
          },
        });
      }
    } catch (e) {
      throw e;
    }
  }
}
