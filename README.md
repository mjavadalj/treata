# Treata 

### restAPI Routes Guide
---
#### SignUp
* mode : post
* Route : /api/user/signup
* request body :

        { 

	    "email":"",

	    "phoneNumber":"",

	    "password":"",

	    "confirmPassword":""

        }
* description :
        
    > حداقل یکی از مقدار های ایمیل یا شماره ضروری

    >فرمت شماره:
09

    > درصورت استفاده از ایمیل کد تایید به ایمیل ارسال میشود
* response body :

        {

        "message": "signup successful - sms sent",

        "user": {

        "phoneNumber": "9379387278",

        "status": "notVerfied",

        "role": "normalUser"
    }
}
---

#### Confirm SignUp
* mode : post
* Route : /api/user/confirmsignup
* request body :

        {
	    "confirmationCode":"",
        }
* description :
        
    > کاربر بعد از ثبت نام تا مدتی میتواند اکانت خود را بدون لوگین شدن تایید کند بعد از آن باید ابتدا وارد اکانت خود شود

* response body :

        {

        "message": "user successfuly confirmed",

        "user": 
    
            {

            "address": [],

            "_id": "5e41746b8402d733906890b3",

            "password": "$2a$10$HN1Xz9f3GJDG4hHKFxvvC.ya2IUReFGfR4z7iE3WdxismkIq56ISy",

            "phoneNumber": "9379387278",

            "status": "notVerfied",

            "confirmationCode": "",

            "role": "normalUser",
        
            }

        }

---
#### Login
* mode : post
* Route : /api/user/login
* request body :

        { 

	    "phoneNumber":"",

	    "password":"",

        }
* description :
        
    > به جای شماره میتوان با ایمیل هم وارد شد
    email

* response body : 

        {
        "message": "login successful",

        "user": 
            {

            "address": [],

            "_id": "5e41746b8402d733906890b3",

            "password": "$2a$10$HN1Xz9f3GJDG4hHKFxvvC.ya2IUReFGfR4z7iE3WdxismkIq56ISy",

            "phoneNumber": "9379387278",

            "status": "verfied",

            "confirmationCode": "",

            "role": "normalUser",

            }

        }
---

#### Log Out
* mode : get
* Route : /api/user/logout
* response body :

        {

        "message": "logged out seccessfuly"

        }
---

#### get current User
* mode : get
* Route : /api/user/getuser
* description :
        
    > اطلاعات یوزرِ لوگین کرده را برمیگرداند - 

    >از طریق 
    > Session
* response body:

    {

        "user": {

            "address": [],

            "_id": "5e41746b8402d733906890b3",

            "password": "$2a$10$HN1Xz9f3GJDG4hHKFxvvC.ya2IUReFGfR4z7iE3WdxismkIq56ISy",

            "phoneNumber": "09",

            "status": "verfied",

            "confirmationCode": "",

            "role": "normalUser",
        
            }
        }
---