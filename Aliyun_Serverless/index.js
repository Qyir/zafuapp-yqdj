'use strict';
exports.handler = (event, context, callback) => {

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
        curareaname: "",
        gpsareaname: "",
        gpsaddress: "",
        adcode: "",
        citycode: "",
        tbrq: moment().format('YYYY-MM-DD'),
        djsj: moment().valueOf(),
    };

    (async () => {
        await axios.post('http://app.zafu.edu.cn/app/user/login.jhtm',
            `userName=${user_info.userName}&enPassword=${user_info.enPassword}`
        ).then(response => {
            if (response.data.type !== 'success') throw new Error(response.data.content);
            user_info.token = response.data.data.token;
        }).catch(err => {
            callback(err);
        });

        axios.defaults.baseURL = 'https://appui.zafu.edu.cn';

        await axios.post('/vapp/yqdj/latestData.jhtm',
            {},
            {
                params: {
                    token: user_info.token
                }
            }).then(response => {
                if (response.data.todaySubmitted) console.log(`今日已填报: ${content.tbrq}`);
                for (let key in content) {
                    response.data[key] = content[key];
                }
                user_info.stryqdj = JSON.stringify(response.data);
            }).catch(err => {
                callback(err);
            });

        let form = new FormData();
        form.append('stryqdj', user_info.stryqdj);

        axios.post('/vapp/yqdj/submit.jhtm',
            form,
            {
                headers: form.getHeaders(),
                params: {
                    token: user_info.token
                }
            }).then(response => {
                if (response.data.type !== 'success') throw new Error(response.data.content);
                console.log(response.data.content);
                callback(null, 'success');
            }).catch(err => {
                callback(err);
            });
    })();

}