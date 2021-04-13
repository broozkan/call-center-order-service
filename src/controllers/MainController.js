import React from 'react'
import api from '../services/api'

export const getOffices = async (page = 1, params = {}, cb) => {
    const offices = await api.get(`/offices/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(offices)
}


export const getEmployees = async (page = 1, params = {}, cb) => {
    const employees = await api.get(`/employees/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(employees)
}


export const getCustomers = async (page = 1, params = {}, cb) => {
    const customers = await api.get(`/customers/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(customers)
}


export const getProducts = async (page = 1, params = {}, cb) => {
    const products = await api.get(`/products/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(products)
}

export const getOrders = async (page = 1, params = {}, cb) => {
    const orders = await api.get(`/orders/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    for (let index = 0; index < orders.data.docs.length; index++) {
        // if (orders.data.docs[index]["order_date"]) {
        //     fixDateTime(orders.data.docs[index]["order_date"], (result) => {
        //         orders.data.docs[index]["order_date"] = result
        //     })
        // }


    }

    cb(orders)
}


export const getUsers = async (page = 1, params = {}, cb) => {
    const users = await api.get(`/users/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(users)
}



export const getPaymentMethods = async (page = 1, params = {}, cb) => {
    const paymentMethods = await api.get(`/payment-methods/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(paymentMethods)
}

export const getCategories = async (page = 1, params = {}, cb) => {
    const categories = await api.get(`/categories/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(categories)
}

export const getMessages = async (page = 1, params = {}, cb) => {
    const messages = await api.get(`/messages/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })
    cb(messages)
}

export const getChats = async (page = 1, params = {}, cb) => {
    const chats = await api.get(`/chats/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })
    cb(chats)
}

export const getReservations = async (page = 1, params = {}, cb) => {
    const reservations = await api.get(`/reservations/${page}`, { headers: { 'site-token': localStorage.getItem('site-token') }, params })

    cb(reservations)
}

export const deleteObject = async (url, cb) => {
    const response = await api.delete(`${url}`, { headers: { 'site-token': localStorage.getItem('site-token') } })

    cb(response)
}

export const fixDateTime = async (dateToBeFixed, cb) => {
    let splittedDate = dateToBeFixed.split(' ')
    let date = splittedDate[0]
    let time = splittedDate[1]

    date = date.split('-')
    date = `${date[2]}-${date[1]}-${date[0]}`

    time = time.split(':')
    time = `${time[0]}:${time[1]}`

    let datetime = `${date} / ${time}`

    cb(datetime)
}