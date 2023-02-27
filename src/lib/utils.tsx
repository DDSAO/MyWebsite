import React from "react";
import axios from "axios";
// import { createHash } from "node:crypto";
import FormData from "form-data";
import { sha256, sha224 } from "js-sha256";

import {
  BiDiamond,
  BiGhost,
  BiMehBlank,
  BiUser,
  BiUserPlus,
  BiLinkExternal,
} from "react-icons/bi";
import { PDFDocument } from "pdf-lib";

export const SendNextPost = async (
  url: string,
  payload: { [key: string]: any }
) => {
  let bodyFormData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    bodyFormData.append(key, value);
  }

  const response = await fetch(`/api/${url}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

export const sendPostRequest = async (args: {
  url: string;
  payload: { [key: string]: any };
}) => {
  let { url, payload } = args;
  let bodyFormData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    bodyFormData.append(key, value);
  }

  let response = await axios({
    method: "post",
    url: `https://www.crazyparts.com.au/czpoffice${url}`,
    data: bodyFormData,
    headers: {
      ...bodyFormData.getHeaders(),
      // 'Authorization': 'Basic NDU0ODFmZjk3Yzk5MWM1YjFhMTM3MmQ5N2E1OWVmZmY6Yjk2YmQ1NzktMzI3YS00N2Y0LWJkMTYtMTczOGI3NTlmYzZj',
    },
    auth: {
      username: "45481ff97c991c5b1a1372d97a59efff",
      password: "b96bd579-327a-47f4-bd16-1738b759fc6c",
    },
  });

  if (response.status === 200) return response.data.data;
  throw new Error(response.data.message);
};

export const sendGetRequest = async (args: { url: string }) => {
  let { url } = args;
  let response = await axios.get(
    `https://www.crazyparts.com.au/czpoffice${url}`,
    {
      auth: {
        username: "45481ff97c991c5b1a1372d97a59efff",
        password: "b96bd579-327a-47f4-bd16-1738b759fc6c",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200) return response.data.data;
  throw new Error(response.data.message);
};

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
  return dateToStr(new Date(time * 1000));
};

export const timestampToDateTimeStr = (time?: number | null) => {
  if (!time) return "-";

  const pad = (number: number) => String(number).padStart(2, "0");
  let theDate = new Date(time * 1000);
  return `${pad(theDate.getDate())}-${pad(theDate.getMonth() + 1)}-${
    theDate.getFullYear() % 100
  } ${pad(theDate.getHours())}:${pad(theDate.getMinutes())}:${pad(
    theDate.getSeconds()
  )} `;
};

export const getCustomerUrl = (url = "") => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:5000/customer" + url;
  } else {
    return "https://czpofficeapp.com/customer" + url;
  }
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
  sha256(sha256(rawPassword));

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

export const customerIcon = (level: string, size?: string) => {
  switch (level) {
    case "Retailer":
      return <BiGhost size={size ? size : undefined} color="grey" />;
    case "Platinum":
      return <BiUserPlus size={size ? size : undefined} color="#822faf" />;
    case "Gold":
      return <BiUser size={size ? size : undefined} color="#ff9b54" />;
    case "Diamond":
      return <BiDiamond size={size ? size : undefined} color="#00509d" />;
    case "Black":
      return <BiMehBlank size={size ? size : undefined} color="black" />;
    default:
      return null;
  }
};

export const customerRank = (level: string) => {
  switch (level) {
    case "Retailer":
      return 1;
    case "Gold":
      return 2;
    case "Platinum":
      return 3;
    case "Diamond":
      return 4;
    case "Black":
      return 5;
    default:
      return 0;
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
