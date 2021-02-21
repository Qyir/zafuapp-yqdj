'use strict';

const axios = require('axios');
const moment = require('moment');
const FormData = require('form-data');

const args = process.argv.splice(2);

let user_info = {
    token: '',
    stryqdj: ''
};

let content = {
    twds: 36.5,
    lng: args[2].split(':')[0],
    lat: args[2].split(':')[1],
    curareaname: args[3],
    gpsareaname: args[3],
    gpsaddress: args[4],
    tbrq: moment().format('YYYY-MM-DD'),
    djsj: moment().valueOf(),
};

((userName, enPassword) => {

    // get token
    axios.post('http://app.zafu.edu.cn/app/user/login.jhtm',
        `userName=${userName}&enPassword=${enPassword}`
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
            if (response.data.todaySubmitted) console.log(`今日已填报: ${moment().format('YYYY-MM-DD kk:mm:ss')}`);

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
            console.log(`${response.data.content}: ${moment().format('YYYY-MM-DD kk:mm:ss')}`);
            return;
        })
        .catch(err => {
            throw new Error(err);
        });
})(args[0], args[1]);
