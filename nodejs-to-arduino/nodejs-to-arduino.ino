/*
 * This file receives a Serial value of "1" or "0" and changes the light based on
 * that value. 
 */  

// Define the port for the LED
// include the library code:
#include <LiquidCrystal.h>


// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);


//int lightPin = 2;
 
void setup() 
{ 
  
  // Initialize the light pin
  //pinMode(lightPin, OUTPUT);
  
    // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print("Advil refill");

  // Initialize the Serial
  Serial.begin(9600);
  
}

void loop() {
  
  // CHeck to see if Serial data is being received
  if (Serial.available() > 0) {
    
    // Create a new string variable to receive Serial data
    String receivedString = "";
    
    // Loop through received data and append to the receivedString variable
    while (Serial.available() > 0) {
      receivedString += char(Serial.read ());
    }
    
    // Print received Serial data
    Serial.println(receivedString);
    
    // Change LED status based on received data
    if(receivedString == "1")
      lcd.display();  
    else
      lcd.noDisplay();
    
  }

}