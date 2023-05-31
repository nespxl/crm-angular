const http = require('http');
const path = require('path');
const { readFileSync } = require('fs');
const fs = require('fs');
const url = require('url')
const express = require('express')

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || './db.json';
const DB_FILE_USERS = process.env.DB_FILE || './dbAuth.json';
const URI_PREFIX = '/api/clients';
const URI_PREFIX_USERS = '/api/users';

class ApiError extends Error {
    constructor(statusCode, data) {
        super();
        this.statusCode = statusCode;
        this.data = data;
    }
}

function drainJson(req) {
    return new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            resolve(data);
        });
    });
}

const server = http.createServer(async (req, res) => {
    if (req.url === URI_PREFIX_USERS) {
        res.setHeader('Content-Type', 'application/json');

        // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        // если URI не начинается с нужного префикса - можем сразу отдать 404
        if (!req.url || !req.url.startsWith(URI_PREFIX_USERS)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Not Found' }));
            return;
        }
        const [uri, query] = req.url.substr(URI_PREFIX_USERS.length).split('?');

        try {
            // обрабатываем запрос и формируем тело ответа
            const body = await (async () => {
                if (uri === '' || uri === '/') {
                    // /api/clients
                    if (req.method === 'GET') {
                        const clients = JSON.parse(readFileSync(DB_FILE_USERS));
                        return clients
                    }
                    if (req.method === 'POST') {
                        const createdItem = await drainJson(req)
                        res.statusCode = 201
                        const dbData = JSON.parse(fs.readFileSync(DB_FILE_USERS, (err, data) => (data)))
                        fs.writeFileSync(DB_FILE_USERS, JSON.stringify([...dbData, JSON.parse(createdItem)]));
                        return createdItem
                    }
                }
                return null
            })();
            res.end(JSON.stringify(body));
        } catch (err) {
            // обрабатываем сгенерированную нами же ошибку
            if (err instanceof ApiError) {
                res.writeHead(err.statusCode);
                res.end(JSON.stringify(err.data));
            } else {
                // если что-то пошло не так - пишем об этом в консоль и возвращаем 500 ошибку сервера
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Server Error' }));
                console.error(err);
            }
        }
    }

    if (req.url === URI_PREFIX) {
        // const parsedUrl = url.parse(req.url, true);
        res.setHeader('Content-Type', 'application/json');

        // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // если URI не начинается с нужного префикса - можем сразу отдать 404
        if (!req.url || !req.url.startsWith(URI_PREFIX)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Not Found' }));
            return;
        }

        const [uri, query] = req.url.substr(URI_PREFIX.length).split('?');

        try {
            // обрабатываем запрос и формируем тело ответа
            const body = await (async () => {
                if (uri === '' || uri === '/') { 
                    // /api/clients
                    if (req.method === 'GET') {
                        const clients = JSON.parse(readFileSync(DB_FILE));
                        return clients
                    }
                    if (req.method === 'POST') {
                        const createdItem = await drainJson(req)
                        const dbData = JSON.parse(fs.readFileSync(DB_FILE, (err, data) => (data)))
                        if(JSON.parse(createdItem).name === 'DELETE_USER_METHOD_RPOST_METHOD') {
                            let index = 0
                            for (let i = 0; i < dbData.length; i++) {
                                if (dbData[i].id === JSON.parse(createdItem).id) {
                                    index = i
                                } 
                            }
                            dbData.splice(index, 1)
                            const deleteArray = fs.writeFileSync(DB_FILE, JSON.stringify([...dbData]));
                            return deleteArray
                        } else {
                            res.statusCode = 201
                            fs.writeFileSync(DB_FILE, JSON.stringify([...dbData, JSON.parse(createdItem)]));
                            return createdItem
                        }
                    }
                    if (req.method === 'PUT') {
                        const createdItem = await drainJson(req)
                        res.statusCode = 201
                        const dbData = JSON.parse(fs.readFileSync(DB_FILE, (err, data) => (data)))
                        let index = 0
                        for (let i = 0; i < dbData.length; i++) {
                            if (dbData[i].id === JSON.parse(createdItem).id) {
                                index = i
                            } 
                        }
                        dbData.splice(index, 1, JSON.parse(createdItem))
                        const putArray = fs.writeFileSync(DB_FILE, JSON.stringify([...dbData]));
                        return putArray
                    }
                }
                return null 
            })(); 
            res.end(JSON.stringify(body));
        } catch (err) {
            // обрабатываем сгенерированную нами же ошибку
            if (err instanceof ApiError) {
                res.writeHead(err.statusCode);
                res.end(JSON.stringify(err.data));
            } else {
                // если что-то пошло не так - пишем об этом в консоль и возвращаем 500 ошибку сервера
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Server Error' }));
                console.error(err);
            }
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
