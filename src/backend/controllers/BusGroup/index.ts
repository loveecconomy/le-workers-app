import BusGroupService from "@/backend/services/BusGroup";
import { BusAccount, BusGroup as Group } from "@/backend/models";
import BaseController from "../Base";
import { NextApiRequest, NextApiResponse } from "next";
import responses from "@/backend/lib/response";
import BusAccountService from "@/backend/services/BusAccount";
import { IBusAccount, IBusGroups } from "@/interface/bus";

class BusGroupController extends BaseController<BusGroupService> {
  protected name = "Bus group";
  constructor(service: BusGroupService, private account: BusAccountService) {
    super(service);
    this.getTree = this.getTree.bind(this)
  }

  async getTree(req: NextApiRequest, res: NextApiResponse) {
    try {
      const currentLineage = await this.service.getTree(req.query)
      return responses.successWithData(res, currentLineage)
    } catch (error: any) {
      return responses.error(res, error.message || error)
    }
  }

  async fullData(req: NextApiRequest, res: NextApiResponse) {
    try {
      const getAll = this.service.exposeDocument(await this.service.get(req.query))
      const data = await Promise.all(
        getAll.map(async (item: any) => {
          item.accounts = await this.account.get({ 'accountType.groupId': item._id })
          return item
        })
      )
      return responses.successWithData(res, data)
    } catch (error: any) {
      return responses.error(res, error.message || error)
    }
  }
}

const BusGroup = new BusGroupController(
  new BusGroupService(Group),
  new BusAccountService(BusAccount)
);
export default BusGroup;
