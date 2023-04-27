#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const solution = (content) => {

  const data = content.split('\r\n').slice(1, content.split('\r\n').length);
  const detailsData = data.map((el) => el.split('|').filter((el) => el).map((el) => el.trim()));
  // 1
  const count = data.length;
  console.log(`Сколько всего видов существ: ${count}`);
  // 2
  const priceForOne = (list) => Number(list[list.length-1]) / Number(list[3]);
  const countOfSU = 10;
  const countOfSSU = 20;
  const maxStrength = Math.max(...detailsData.map((el) => el[1]));
  const sUnit = detailsData.filter((el) => el.includes(String(maxStrength))).flat();
  const sSUnit = detailsData.filter((el) => !el.includes(String(maxStrength))).flat();
  const price = priceForOne(sUnit) * countOfSU + priceForOne(sSUnit) * countOfSSU;
  console.log(`Цена найма 10 самых сильных существ и 20 существ вторых по силе: ${price}`);
  // 3 
  const fattest = detailsData.filter((el) => el.includes(String(Math.max(...detailsData.map((el) => el[3]))))).flat();
  const thinnest = detailsData.filter((el) => el.includes(String(Math.min(...detailsData.map((el) => el[3]))))).flat();
  const priceFattestAndThinnest = Number(fattest[fattest.length-1]) + Number(thinnest[thinnest.length-1]);
  console.log(`Самый толстый юнит: ${fattest[0]}, Самый худой юнит: ${thinnest[0]}, Стоимость найма этих отрядов: ${priceFattestAndThinnest}`)
  // 4
  const coefUnits = detailsData.reduce((acc, el) => [...acc, [el[1] / el[el.length-1], el[0]]], []);
  const profitableCoef = Math.max(...coefUnits.map((el) => el[0]));
  const unprofitableCoef = Math.min(...coefUnits.map((el) => el[0]));
  const profitableUnit = coefUnits.filter((el)=>el.includes(profitableCoef)).flat();
  const unprofitableUnit = coefUnits.filter((el)=>el.includes(unprofitableCoef)).flat();
  console.log(`Самые невыгодные: ${unprofitableUnit[1]}, Самые выгодные: ${profitableUnit[1]}`);
  //5
  const currency = 10000;
  const squads = detailsData.reduce((acc, el) => {
    const countSquads = (currency / el[el.length-1]);
    const strOfSquad = countSquads * Number(el[3]) * Number(el[1]);
    return [...acc, [strOfSquad, el[0]]];
  }, []);
    const strongestSquad = Math.max(...squads.map((el) => el[0]));
    const strongestType = squads.filter((el) => el.includes(strongestSquad)).flat();
  console.log(`Отряд за 10000: ${strongestType[0]} ${strongestType[1]}`);
  
};

solution(content);
// END