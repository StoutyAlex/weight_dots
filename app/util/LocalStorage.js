// import React from 'react';
import { AsyncStorage } from 'react-native';

const loadItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error loading data ${error}`);
  }
};

const saveItem = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
    console.log(`Saved item: ${item} to key: ${key}`);
  } catch (error) {
    console.log(`Error saving data\n${error}`);
  }
};

const saveRecord = async (month, year, date, value) => {
  let tempMonth = null;
  try {
    tempMonth = await loadItem(`${month}-${year}`);
    if (tempMonth === null) {
      console.log('No month already saved using new month');
      tempMonth = {};
      tempMonth[date] = value;
    } else {
      // there is a month add it and save
      tempMonth[date] = value;
    }
    await saveItem(`${month}-${year}`, JSON.stringify(tempMonth));
    console.log(`Saved month ${month}-${year} at date ${date}\n${tempMonth}`);
    return tempMonth;
  } catch (error) {
    console.log(`Problem saving month ${month}-${year}\n${error}`);
  }
};

const getMonth = async (month, year) => {
  let tempMonth = null;
  try {
    tempMonth = await loadItem(`${month}-${year}`);
    if (tempMonth === null) {
      return {};
    };
    return tempMonth;
  } catch (error) {
    console.log(`Problem getting month data\n${error}`);
  }
};

export {
  loadItem,
  saveItem,
  saveRecord,
  getMonth,
}