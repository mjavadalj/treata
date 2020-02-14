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

	    "confirmPassword":"",

        "role":""

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

            "phoneNumber": "9********",

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

            "phoneNumber": "9********",

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

            "phoneNumber": "9*******",

            "status": "verfied",

            "confirmationCode": "",

            "role": "normalUser",

            }

        }
---
#### Mobile Login with sms
#### مرحله اول
* mode : post
* Route : /api/user/disposablePassword
* request body :

        { 
	    "phoneNumber":""

        }

* response body :

        {
            "message": "sms sent"
        }




        
#### مرحله دوم
* mode : post
* Route : /api/user/loginwithsms
* request body :

        { 
	        "phoneNumber":"",
            "disposablePassword":""

        }

* response body :

        {
            message: 'signup successful - sms sent',
            user: {}
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

#### add news
* mode : post
* Route : /api/news/addnews

* request body : (form data)

        { 
	        "photos":"", (max 3)
            "text":"",
            "title":"" (unique)

        }

* response body:

        {
        "message": "news added",
        "news": {
                "pictureFile": [
                        "http://localhost:3000/files/image/image1.jpg",
                        "http://localhost:3000/files/image/image2.jpg"
                ],
        "likes": 0,
        "_id": "5e468315840a7e1e50ad397f",
        "title": "first",
        "textFile": "http://localhost:3000/files/txt/first.txt",
        "__v": 0
    }
}
---


#### remove news
* mode : post
* Route : /api/news/removenews

* request body : 

        { 
            "title":"" 

        }

* response body:

        {

        "message":  "news deleted"
    
        }
---


#### get news
* mode : post
* Route : /api/news/getnews

* request body : 

        { 
            "title":"" 
        }

* response body:

        {
        "message": "successful",
        "news": {
                "pictureFile": [
                        "http://localhost:3000/files/image/image1.jpg",
                        "http://localhost:3000/files/image/56822174.jpg"
                ],
                "likes": 13,
                "_id": "5e468315840a7e1e50ad397f",
                "title": "first",
                "textFile": "http://localhost:3000/files/txt/first.txt",
                "__v": 0
        },
        "text": "a;ljd;lasdfpoaejdjafoiewjf aw jwoaejf awoe 9rwojd wewe933wafefs"
        }
---

#### search news
* mode : post
* Route : /api/news/searchnews

* request body : 

        { 
            "pattern":"" 
        }

* response body:

        {
        "message": "finding successful",
        "news": {
                "pictureFile": [
                        "http://localhost:3000/files/image/image1.jpg",
                        "http://localhost:3000/files/image/56822174.jpg"
                ],
                "likes": 13,
                "_id": "5e468315840a7e1e50ad397f",
                "title": "first",
                "textFile": "http://localhost:3000/files/txt/first.txt",
                "__v": 0
        }
        }
---
#### like and unlike news
* mode : post
* Route : /api/user/likenews && /api/user/unlikenews

* request body : 

        { 
            "title":"" 
        }

* response body:

        {
        "message": "finding successful",
        "news": {
                "pictureFile": [
                        "http://localhost:3000/files/image/image1.jpg",
                        "http://localhost:3000/files/image/56822174.jpg"
                ],
                "likes": 13,
                "_id": "5e468315840a7e1e50ad397f",
                "title": "first",
                "textFile": "http://localhost:3000/files/txt/first.txt",
                "__v": 0
        }
        }
---


#### save and unsave news
* mode : post
* Route : /api/user/savenews && /api/user/unsavenews

* request body : 

        { 
            "title":"" 
        }

* response body:

        {
        "message": "news saved successfully",
        "user": {
                "address": [],
                "likedNews": [],
                "savedNews": [
                        "5e468315840a7e1e50ad397f"
                ],
                "_id": "5e467fa3da792340f8bf34ca",
                "password": "$2a$10$7p3fsyjXI7K1Cr3Jgh3PWuI92ZrYeWlffr/KJOPFdzm8MM4CERvom",
                "email": "silencio_aj@yahoo.com",
                "status": "verfied",
                "confirmationCode": "",
                "role": "admin",
                "__v": 14
        }
        }
---