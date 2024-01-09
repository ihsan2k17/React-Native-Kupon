import React from "react";
import SalesModel, { Sales } from "../models/sales";

export const fetchSalesData = async (
    setSalesData: React.Dispatch<React.SetStateAction<Sales[]>>) => {
    try {
        const data = await SalesModel.getAllSales();
        setSalesData(data);
    } catch (error) {
        console.log('Gagal Memuat Data', error);
        throw error;
    }
};

export const FetchListSalesId = async (
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setListSales: React.Dispatch<React.SetStateAction<Sales[]>>
) => {
    try {
        const data = await SalesModel.getAllSales();
        return setListSales(data)
    } catch (error) {
        setNotificationModal('Gagal Mengambil list sales, ' + error + '');
    }
}


export const handleSearch = async (
    setSearchSalesData: React.Dispatch<React.SetStateAction<Sales[]>>,
    setSearchSalesQuery: React.Dispatch<React.SetStateAction<string>>,
    searchSalesQuery: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await SalesModel.searchSales(searchSalesQuery);
        setSearchSalesData(data);
    } catch (error) {
        setModal(true);
        setModalType('error-get-search-sales');
        setNotificationModal('Gagal Mengambil data sales, ' + error + '');
    }
};

export const handleCreateSales = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateData: React.Dispatch<React.SetStateAction<Sales | null>>,
    salesData: Sales) => {
    try {
        setLoading(true);
        await SalesModel.createSales(salesData);
        setCreateData(salesData);
    } catch (error) {
        setLoading(false);
        console.log('Gagal Memuat Data', error);
    }
};