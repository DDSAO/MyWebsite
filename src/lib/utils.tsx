import React from "react";
// import { createHash } from "node:crypto";
import sha256 from "crypto-js/sha256";

import {
  BiDiamond,
  BiGhost,
  BiMehBlank,
  BiUser,
  BiUserPlus,
  BiLinkExternal,
} from "react-icons/bi";
import { PDFDocument } from "pdf-lib";

export const toTimestamp = (time: number) => Math.floor(time / 1000);
export const getTimestamp = (dateStr: string) =>
  toTimestamp(new Date(dateStr).getTime());

export const dateToStr = (date: Date) => {
  let theDate = new Date(date);
  return `${theDate.getDate()}/${
    theDate.getMonth() + 1 < 10
      ? "0" + (theDate.getMonth() + 1)
      : theDate.getMonth() + 1
  }/${theDate.getFullYear() % 100}`;
};

export const strToDate = (str: string) => {
  if (typeof str !== "string") return new Date(0);
  let [d, m, y] = str.split("/");
  let date = new Date(parseInt("20" + y), parseInt(m) - 1, parseInt(d));
  return date;
};

export const strToDay = (str: string) => {
  let date = strToDate(str);
  if (date.getDay() === 0) {
    return "Sunday";
  } else if (date.getDay() === 1) {
    return "Monday";
  } else if (date.getDay() === 2) {
    return "Tuesday";
  } else if (date.getDay() === 3) {
    return "Wednesday";
  } else if (date.getDay() === 4) {
    return "Thursday";
  } else if (date.getDay() === 5) {
    return "Friday";
  } else if (date.getDay() === 6) {
    return "Satuday";
  }
  return "";
};

export const dateToMonthStr = (date: Date) => {
  return `${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear() % 100}`;
};

export const timestampToDateStr = (time?: number | null) => {
  if (!time) return "-";
  let date = new Date(time * 1000);
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const timestampToDateTimeStr = (time?: number | null) => {
  if (!time) return "-";

  let date = new Date(time * 1000);
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
};
export const timestampToCountUp = (ts: number) => {
  const format = (val: any) => String(Math.floor(val)).padStart(2, "0");
  const days = Math.floor(ts / 86400);
  const hours = (ts % 86400) / 3600;
  const minutes = (ts % 3600) / 60;
  const seconds = ts % 60;
  if (days === 0) {
    if (hours < 1) return [minutes, seconds].map(format).join(":");
    return [hours, minutes, seconds].map(format).join(":");
  }
  return `${days} days - ${[hours, minutes, seconds].map(format).join(":")}`;
};

export const aboveDiamond = (group: string) => {
  return ["Diamond", "Black"].includes(group);
};

export const toOneDecimals = (num: number) => +(Math.round(num * 10) + "e-1");
export const toTwoDecimals = (num: number) => +(Math.round(num * 100) + "e-2");
export const toFourDecimals = (num: number) =>
  +(Math.round(num * 10000) + "e-4");

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const hashPassword = (rawPassword: string) =>
  JSON.stringify(sha256(JSON.stringify(sha256(rawPassword).words)).words);

// export const hashPassword = (rawPassword: string) =>
//   JSON.stringify(sha256(JSON.stringify(sha256(rawPassword).words)).words);

export const toAccountingNumber = (x: number | null | undefined) => {
  return x !== null && x !== undefined
    ? (+(Math.round(x * 100) + "e-2")).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "-";
};

export const toHumanReadable = (num: number | null) => {
  if (num === null || num === undefined) return "-";
  if (num >= 100 && num < 100000) {
    return `${toOneDecimals(num / 1000)} K`;
  } else if (num >= 100000) {
    return `${toOneDecimals(num / 1000000)} M`;
  } else if (num <= -100 && num > -100000) {
    return `${toOneDecimals(num / 1000)} K`;
  } else if (num <= -100000) {
    return `${toOneDecimals(num / 1000000)} M`;
  } else {
    return toOneDecimals(num);
  }
};

export const getNow = () => toTimestamp(new Date().getTime());

export const getDaysAgo = (days: number, setHours?: string) => {
  if (!setHours) {
    return toTimestamp(new Date().setDate(new Date().getDate() - days));
  } else {
    let numberArr: number[] = setHours.split(",").map((i) => parseInt(i));
    return toTimestamp(
      new Date(new Date().setDate(new Date().getDate() - days)).setHours(
        numberArr[0],
        numberArr[1],
        numberArr[2]
      )
    );
  }
};

export const exportCsv = (
  data: (string | number | null | undefined)[][],
  filename: string
) => {
  let csv = "";
  data.forEach(function (row) {
    csv += row
      .map((text) => {
        if (typeof text === "object" || typeof text === "undefined") return "";
        if (typeof text !== "number")
          return `="${String(text).replaceAll(
            /[&\\#,+()$~%.'":*?<>{}]/g,
            "-"
          )}"`;
        return text;
      })
      .join(",");
    csv += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = `${filename}.csv`;
  hiddenElement.click();
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const buildDictFromArray = (rows: any[], key: string) => {
  let result: { [key: string]: any } = {};
  for (const row of rows) {
    result[String(row[key])] = row;
  }
  return result;
};

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const openNewTab = (url: string, absolutePath?: boolean) => {
  if (absolutePath)
    return window.open(`${url}`, "_blank", "noopener,noreferrer");
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return window.open(
      `http://localhost:3000${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  } else {
    return window.open(
      `https://czpofficeapp.com${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
};

// export const printPdf = async (draw: (pdfDoc: PDFDocument) => void) => {
//   const pdfDoc = await PDFDocument.create();
//   await draw(pdfDoc);
//   const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
//   const printJS = (await import("print-js")).default;
//   printJS({
//     printable: pdfDataUri.replace("data:application/pdf;base64,", ""),
//     type: "pdf",
//     base64: true,
//   });
// };

export const LABEL_60X40_SIZE: [number, number] = [170, 113];
