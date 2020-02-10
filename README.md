# Treata 

### restAPI Route Guide
---
#### SignUp
* mode : post
* Route : /api/user/signup
* body :

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

---

#### Confirm SignUp
* mode : post
* Route : /api/user/confirmsignup
* body :

        {
	    "confirmationCode":"",
        }
* description :
        
    > کاربر بعد از ثبت نام تا مدتی میتواند اکانت خود را بدون لوگین شدن تایید کند بعد از آن باید ابتدا وارد اکانت خود شود


---
#### Login
* mode : post
* Route : /api/user/login
* body :

        { 

	    "phoneNumber":"",

	    "password":"",

        }
* description :
        
    > به جای شماره میتوان با ایمیل هم وارد شد
    email


---

#### Log Out
* mode : get
* Route : /api/user/logout

---

#### get current User
* mode : get
* Route : /api/user/getuser
* description :
        
    > اطلاعات یوزرِ لوگین کرده را برمیگرداند - 

    >از طریق 
    > Session

---