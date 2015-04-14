nelson@NELSON-PC:~$ keytool -genkey -v -keystore wofli-mobile-app.keystore -alias wofli_mobile -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:  
Keystore password is too short - must be at least 6 characters
Enter keystore password:  
Re-enter new password: 
What is your first and last name?
  [Unknown]:  Wofli     
What is the name of your organizational unit?
  [Unknown]:  Wofli Software
What is the name of your organization?
  [Unknown]:  Wofli Software
What is the name of your City or Locality?
  [Unknown]:  Porto Alegre
What is the name of your State or Province?
  [Unknown]:  Rio Grande do Sul
What is the two-letter country code for this unit?
  [Unknown]:  BR
Is CN=Wofli, OU=Wofli Software, O=Wofli Software, L=Porto Alegre, ST=Rio Grande do Sul, C=BR correct?
  [no]:  y

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
	for: CN=Wofli, OU=Wofli Software, O=Wofli Software, L=Porto Alegre, ST=Rio Grande do Sul, C=BR
Enter key password for <wofli_mobile>
	(RETURN if same as keystore password):  
Re-enter new password: 
They don't match. Try again
Enter key password for <wofli_mobile>
	(RETURN if same as keystore password):  
Re-enter new password: 
[Storing wofli-mobile-app.keystore]

password: woflimobile