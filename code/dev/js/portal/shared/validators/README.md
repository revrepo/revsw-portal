# TODO validation directives

- Phone Number -

    ng-pattern="/^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/"

- Username (2-20 Alpha-numeric characters)

    ng-pattern="/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/"

- Single Word (Alpha-numeric)

    ng-pattern="/^[a-zA-Z][a-zA-Z0-9-_\.]{1,50}$/"

- Words only (no special characters)

    ng-pattern="/^[A-Za-z0-9 ]+$/"

- Words only (no special character - 50 char limit)

    ng-pattern="/^[\-\:\[\]\(\)\_\+\.\,\'\{\}A-Za-z0-9 ]{1,50}$/"

- No HTML tags

    ng-pattern="/^[\-\:\[\]\(\)\_\+\.\,\?\=\#\&amp;\*\$\@\!\%\^\'\{\}\;&quot;\/\\A-Za-z0-9 ]{1,300}$/"

- Url

    ng-pattern="/(https?:)?//.+/"

- Credit Card

    ng-pattern="/[0-9]{13,16}/"

- Numeric

    ng-pattern="/[0-9]+/"

- Date (mm/dd/yyyy)

    ng-pattern="/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/"
