export default {
    title: {
        required: true,
        minLength: {
            value: 16,
            message: 'عنوان باید حداقل 16 کاراکتر داشته باشه!'
        },
        maxLength: {
            value: 256,
            message: 'عنوان باید زیر 257 کلمه باشه!'
        }
    },
    caption: {
        required: false, maxLength: {
            value: 1024,
            message: 'توضیحات باید کمتر از 1025 کاراکتر باشه!'
        }
    }
}