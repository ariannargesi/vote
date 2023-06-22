export default {
    title: {
        required: 'عنوان رای‌گیری رو وارد کن!',
        minLength: {
            value: 16,
            message: 'عنوان باید حداقل ۱۶ کاراکتر داشته باشه!'
        },
        maxLength: {
            value: 256,
            message: 'عنوان باید کمتر از ۲۵۷ کاراکتر باشه!'
        }
    },
    caption: {
        required: false, maxLength: {
            value: 1024,
            message: 'توضیحات باید کمتر از 1025 کاراکتر باشه!'
        }
    },
    option:{           
        required: 'این یکی رو یادت رفت!',                  
        maxLength: {
            value: 128,
            message: 'گزینه باید کمتر از ۱۲۹ کاراکتر باشه!'            
        }
    }
    
}