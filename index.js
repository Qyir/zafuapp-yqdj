'use strict';

const axios = require('axios');
const moment = require('moment');
const FormData = require('form-data');

let user_info = {
    userName: '',
    enPassword: '',
    token: '',
    stryqdj: ''
};

let content = {
    lng: "",
    lat: "",
    twds: 36.5,
    curareaname: "XX省XX市XX县(区)",
    gpsareaname: "XX省XX市XX县(区)",
    gpsaddress: "XX省XX市......",
    adcode: "",
    citycode: "",
    tbrq: moment().format('YYYY-MM-DD'),
    djsj: moment().valueOf(),
};

(() => {

    // get token
    axios.post('http://app.zafu.edu.cn/app/user/login.jhtm',
        `userName=${user_info.userName}&enPassword=${user_info.enPassword}`
        )
        .then(response => {
            if (response.data.type !== 'success') throw new Error(response.data.content);
            user_info.token = response.data.data.token;

            axios.defaults.baseURL = 'https://appui.zafu.edu.cn';
            // get latest data
            return axios.post('/vapp/yqdj/latestData.jhtm',
                {},
                {
                    params: {
                        token: user_info.token
                    }
                });
        })
        .then(response => {
            if (response.data.todaySubmitted) console.log(`今日已填报: ${content.tbrq}`);

            response.data = Object.assign(response.data, content);

            // formData format
            user_info.stryqdj = JSON.stringify(response.data);
            let form = new FormData();
            form.append('stryqdj', user_info.stryqdj);

            // submit
            return axios.post('/vapp/yqdj/submit.jhtm',
                form,
                {
                    headers: form.getHeaders(),
                    params: {
                        token: user_info.token
                    }
                })
        })
        .then(response => {
            if (response.data.type !== 'success') throw new Error(response.data.content);
            console.log(response.data.content);
            return;
        })
        .catch(err => {
            throw new Error(err);
        });
})();
