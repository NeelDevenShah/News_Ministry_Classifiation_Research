const express = require("express");
const CL_News = require("../Models/classified.js");
const CN = require("../Models/classified.js");
const UCL_News = require("../Models/unclassified.js");
const UCN = require("../Models/unclassified.js");
const Url_sent = "http://127.0.0.1:7200/sentiment/get-sentiment";
const Url_min = "http://127.0.0.1:7200/ministry/get-ministry-class";
const axios = require("axios");

ministry_list = {
  0: "Ministry of Railways",
  1: "Ministry of Rural Development",
  2: "Ministry of Steel",
  3: "Ministry of Science & Technology",
  4: "Ministry of Information & Broadcasting",
  5: "Ministry of Food Processing Industries",
  6: "Ministry of Health and Family Welfare",
  7: "Ministry of Human Resource Development",
  8: "Ministry of Agriculture",
  9: "Ministry of Environment and Forests",
  10: "Ministry of Chemicals and Fertilizers",
  11: "Ministry of Water Resources",
  12: "Ministry of Defence",
  13: "Ministry of Petroleum & Natural Gas",
  14: "President's Secretariat",
  15: "Ministry of Micro,Small & Medium Enterprises",
  16: "Ministry of Mines",
  17: "Ministry of Tourism",
  18: "Ministry of Housing & Urban Affairs",
  19: "Ministry of Coal",
  20: "Prime Minister's Office",
  21: "Ministry of Textiles",
  22: "Ministry of Commerce & Industry",
  23: "Ministry of External Affairs",
  24: "Ministry of Social Justice & Empowerment",
  25: "Ministry of Power",
  26: "Ministry of Consumer Affairs, Food & Public Distribution",
  27: "Ministry of Heavy Industries & Public Enterprises",
  28: "Ministry of Communications",
  29: "Ministry of Shipping",
  30: "Ministry of Finance",
  31: "Ministry of Tribal Affairs",
  32: "Ministry of Statistics & Programme Implementation",
  33: "Ministry of Labour & Employment",
  34: "Ministry of Law & Justice",
  35: "Vice President's Secretariat",
  36: "Ministry of Civil Aviation",
  37: "Ministry for Development of North-East Region",
  38: "UPSC",
  39: "Ministry of Agro & Rural Industries",
  40: "Ministry of Home Affairs",
  41: "Ministry of Youth Affairs and Sports",
  42: "Special Service and Features",
  43: "Ministry of New and Renewable Energy",
  44: "Ministry of Parliamentary Affairs",
  45: "Planning Commission",
  46: "Ministry of Personnel, Public Grievances & Pensions",
  47: "Election Commission",
  48: "Department of Space",
  49: "Ministry of Disinvestment",
  50: "Department of Ocean Development",
  51: "Ministry of Overseas Indian Affairs",
  52: "Ministry of Housing and Urban Poverty Alleviation",
  53: "Ministry of Culture",
  54: "Ministry of Company Affairs",
  55: "Ministry of Panchayati Raj",
  56: "Cabinet Committee on Economic Affairs (CCEA)",
  57: "Cabinet",
  58: "Department of Atomic Energy",
  59: "Cabinet Committee Decisions",
  60: "No Ministry"
}

const classify = async () => {
  let news = await UCN.find({});
  console.log(news)
  if (news.length < 1) {
    return;
  }

  // console.log(news)
  let news_arr = [];

  news.forEach(async (element) => {
    let text = element.title + " : " + element.description;
    let json = { _id: element._id, text };
    news_arr.push(json);
  });

  const promises = [
    axios.post(Url_sent, news_arr),
    axios.post(Url_min, news_arr),
  ];

  //  axios.post(Url_sent, news_arr)
  Promise.all(promises).then(async (response) => {
    // console.log(response[0].data);
    // console.log(response[1].data[1].ministries);

    for (let index = 0; index < news_arr.length; index++) {
      // let ministry1=[]
      // let size = response[1].data[0].ministries.length

      // for (let index2 = 0; index2 < size; index2++) {
      //   let arr=response[1].data[index].ministries
      //   ministry1.push(ministry_list[arr[index2]])
      // }

      const element = news[index];
      element.sentiment = response.data[index].sentiment;
      element.ministry = ministry_list[response.data[index].ministries[0]];

      console.log(element)
    }

    news.forEach(async (element) => {

      let thisnews = element.toJSON();
      delete thisnews._id
      await CL_News.create(thisnews)
      await UCL_News.findByIdAndDelete(element.id)
    });

    // json["sentiment"]=response.data
    // console.log(json)

  });

};

module.exports = classify;

