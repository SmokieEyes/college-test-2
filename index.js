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

  const data = content.split('\r\n').slice(1);
  const detailsData = data.map((el) => el.split('|').filter((el) => el).map((el) => el.trim()));
  // 1
  console.log(`Сколько всего видов существ: ${data.length}`);
  // 2
  const priceForOne = (list) => Number(list[list.length-1]);
  const maxStrength = Math.max(...detailsData.map((el) => el[1]));
  const sUnit = detailsData.filter((el) => el[1] === String(maxStrength)).flat();
  const sSUnits = detailsData.filter((el) => el[1] !== String(maxStrength));
  const sSUnit = sSUnits.filter((el) => el[1] === String(Math.max(...sSUnits.map((el) => el[1])))).flat();
  console.log(`Цена найма 10 самых сильных: ${priceForOne(sUnit) * 10}. Самый сильный: ${sUnit[0]}. Цена найма 20 вторых по силе: ${priceForOne(sSUnit)*20}, второй по силе: ${sSUnit[0]}`);
 
  // 3 
  const fattest = detailsData.filter((el) => el[5] === String(Math.max(...detailsData.map((el) => el[5])))).flat();
  const thinnest = detailsData.filter((el) => el[5] === String(Math.min(...detailsData.map((el) => el[5])))).flat();
  console.log(`Самый толстый юнит: ${fattest[0]}. Cтоимость найма отряда ${fattest[0]}ов: ${Number(fattest[3]) * priceForOne(fattest)}, Самый худой юнит: ${thinnest[0]}. Стоимость найма отряда ${thinnest[0]}ов: ${Number(thinnest[3]) * priceForOne(thinnest)}`)
  // 4
  const coefUnits = detailsData.reduce((acc, el) => [...acc, [Math.round(el[el.length-1] / el[1]), el[0], el[el.length-1]] ], []);
  const unprofitableCoef = Math.max(...coefUnits.map((el) => el[0]));
  const profitableCoef = Math.min(...coefUnits.map((el) => el[0]));
  const profitableUnit = coefUnits.filter((el) => el.includes(profitableCoef)).flat();
  const unprofitableUnit = coefUnits.filter((el) => el.includes(unprofitableCoef)).flat();
  console.log(`Самые невыгодные: ${unprofitableUnit[1]}, Самые выгодные: ${profitableUnit[1]}`);
  //5
  console.log(`Отряд за 10000: ${10000 / priceForOne(profitableUnit)} ${profitableUnit[1]}ов`);
};

solution(content);
// END