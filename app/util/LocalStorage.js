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
    await AsyncStorage.setItem(key, JSON.stringify(item));
    console.log('Saved item:');
    console.log(item);
    console.log(key);
    return item;
  } catch (error) {
    console.log(`Error saving data\n${error}`);
  }
};

const saveRecord = async (date, month, year, value) => {
  let tempMonth = null;
  try {
    tempMonth = await loadItem(`${month}-${year}`);
    if (tempMonth === null) {
      tempMonth = {};
      tempMonth[date] = value;
    } else {
      // there is a month add it and save
      tempMonth[date] = value;
    }
    await saveItem(`${month}-${year}`, tempMonth);
    // console.log(`Saved month ${month}-${year} at date ${date}\n${tempMonth}`);
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

const clear = async (month, year) => {
  try {
    await saveItem(`${month}-${year}`, JSON.stringify({}));
  } catch (error) {
    console.log(error);
  }
};

export {
  loadItem,
  saveItem,
  saveRecord,
  getMonth,
  clear,
}