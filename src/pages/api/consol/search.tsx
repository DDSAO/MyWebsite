// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ConsolCollection, client, verifyToken } from "@/lib/db";
import { toTimestamp } from "@/lib/utils";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  let token = getCookie("token", { req, res });
  let user = await verifyToken(token ? token.toString() : null);
  if (!user) return res.status(200).json({ ok: 0, error: "Token expired" });

  let { filters } = req.body;

  await client.connect();

  //BUSINESS LOGICS
  let createdAt = null;
  if (filters.onlyToday) {
    createdAt = {
      $gte: toTimestamp(new Date().setHours(0, 0, 0)),
      $lte: toTimestamp(new Date().setHours(23, 59, 59)),
    };
  } else if (filters.createdAtFrom && filters.createdAtTo) {
    createdAt = {
      $gte: toTimestamp(
        new Date(filters.createdAtFrom * 1000).setHours(0, 0, 0)
      ),
      $lte: toTimestamp(
        new Date(filters.createdAtTo * 1000).setHours(23, 59, 59)
      ),
    };
  } else if (filters.createdAtFrom && !filters.createdAtTo) {
    createdAt = {
      $gte: toTimestamp(
        new Date(filters.createdAtFrom * 1000).setHours(0, 0, 0)
      ),
    };
  } else if (filters.createdAtTo && !filters.createdAtFrom) {
    createdAt = {
      $lte: toTimestamp(
        new Date(filters.createdAtTo * 1000).setHours(23, 59, 59)
      ),
    };
  }

  let dealDate = null;
  if (filters.dealDateFrom && filters.dealDateTo) {
    dealDate = {
      $gte: toTimestamp(
        new Date(filters.dealDateFrom * 1000).setHours(0, 0, 0)
      ),
      $lte: toTimestamp(
        new Date(filters.dealDateTo * 1000).setHours(23, 59, 59)
      ),
    };
  } else if (filters.dealDateFrom && !filters.dealDateTo) {
    dealDate = {
      $gte: toTimestamp(
        new Date(filters.dealDateFrom * 1000).setHours(0, 0, 0)
      ),
    };
  } else if (!filters.dealDateFrom && filters.dealDateTo) {
    dealDate = {
      $lte: toTimestamp(
        new Date(filters.dealDateTo * 1000).setHours(23, 59, 59)
      ),
    };
  }

  let parsedFilters: any = {
    consolId: filters.consolId
      ? new RegExp(filters.consolId, "ig")
      : { $exists: 1 },
    "warehouse.id": filters.warehouseId
      ? new RegExp(filters.warehouseId, "ig")
      : { $exists: 1 },
    operator: filters.operator
      ? new RegExp(filters.operator, "ig")
      : { $exists: 1 },
    sales: filters.sales ? new RegExp(filters.sales, "ig") : { $exists: 1 },
    MBL: filters.MBL ? new RegExp(filters.MBL, "ig") : { $exists: 1 },
    status: filters.status ? new RegExp(filters.status, "ig") : { $exists: 1 },
    paymentType: filters.paymentType
      ? new RegExp(filters.paymentType, "ig")
      : { $exists: 1 },

    "shipments.consignor.id": filters.consignorId
      ? new RegExp(filters.consignorId, "ig")
      : { $exists: 1 },
    "shipments.consignee.id": filters.consigneeId
      ? new RegExp(filters.consigneeId, "ig")
      : { $exists: 1 },
    "shipments.shipmentId": filters.shipmentId
      ? new RegExp(filters.shipmentId, "ig")
      : { $exists: 1 },
    "shipments.HBL": filters.HBL
      ? new RegExp(filters.HBL, "ig")
      : { $exists: 1 },
    "shipments.containers.containerNumber": filters.containerId
      ? new RegExp(filters.containerId, "ig")
      : { $exists: 1 },

    "routings.vessel": filters.vessel
      ? new RegExp(filters.vessel, "ig")
      : { $exists: 1 },
    "routings.load": filters.load
      ? new RegExp(filters.load, "ig")
      : { $exists: 1 },
    "routings.discharge": filters.discharge
      ? new RegExp(filters.discharge, "ig")
      : { $exists: 1 },
    "routings.ETD": filters.ETD ? { $gte: filters.ETD } : { $exists: 1 },
    "routings.ETA": filters.ETA ? { $lte: filters.ETA } : { $exists: 1 },

    "importAgent.id": filters.importAgentId
      ? new RegExp(filters.importAgentId, "ig")
      : { $exists: 1 },
    "exportAgent.id": filters.exportAgentId
      ? new RegExp(filters.exportAgentId, "ig")
      : { $exists: 1 },
  };

  if (dealDate) parsedFilters.dealDate = dealDate;
  if (createdAt) parsedFilters.createdAt = createdAt;

  let consols = await ConsolCollection.find(parsedFilters as any)
      .sort({ id: -1 })
      .skip((filters.page_no - 1) * filters.page_num)
      .limit(filters.page_num)
      .toArray(),
    totalNum = await ConsolCollection.countDocuments(parsedFilters);

  //if error
  //return res.status(200).json({ ok: 0, error: "RMA NOT FOUND" });

  let data = {
    ok: 1,
    data: {
      consols,
      totalNum,
    },
  };

  return res.status(200).json(data);
}
