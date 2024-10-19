#include <Arduino.h>
#include <Esplora.h>

// Define the pin for the buzzer
const int buzzerPin = 6;

// Define the frequencies for the notes
const int noteC = 261; // Frequency for C
const int noteD = 294; // Frequency for D
const int noteE = 329; // Frequency for E
const int noteF = 349; // Frequency for F

void setup() {
  // Inicializa la comunicación serie
  Serial.begin(9600);
  // Set the buzzer pin as output
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  // Leer los datos de los sensores
  int joystickX = Esplora.readJoystickX();
  int joystickY = Esplora.readJoystickY();
  int light = Esplora.readLightSensor();  // Lee el sensor de luz
  int temperature = Esplora.readTemperature(0);  // Usa 0 para grados Celsius
  int slider = Esplora.readSlider();
  int microphone = Esplora.readMicrophone();
  int accelX = Esplora.readAccelerometer(0);  // Eje X
  int accelY = Esplora.readAccelerometer(1);  // Eje Y
  int accelZ = Esplora.readAccelerometer(2);  // Eje Z
  int button1 = Esplora.readButton(0);
  int button2 = Esplora.readButton(1);
  int button3 = Esplora.readButton(2);
  int button4 = Esplora.readButton(3);

  // Enviar los datos por el puerto serie, separados por comas
  Serial.print(joystickX);
  Serial.print(",");
  Serial.print(joystickY);
  Serial.print(",");
  Serial.print(light);
  Serial.print(",");
  Serial.print(temperature);
  Serial.print(",");
  Serial.print(slider);
  Serial.print(",");
  Serial.print(microphone);
  Serial.print(",");
  Serial.print(accelX);
  Serial.print(",");
  Serial.print(accelY);
  Serial.print(",");
  Serial.print(accelZ);
  Serial.print(",");
  Serial.print(button1);
  Serial.print(",");
  Serial.print(button2);
  Serial.print(",");
  Serial.print(button3);
  Serial.print(",");
  Serial.println(button4);

  // Check if data is available on the serial port
  if (Serial.available() > 0) {
    // Read the incoming note
    char note = Serial.read();
    playNoteOnBuzzer(note);
  }
}

// Function to play a note on the buzzer
void playNoteOnBuzzer(char note) {
  int frequency = 0;
  switch (note) {
    case 'C':
      frequency = noteC;
      break;
    case 'D':
      frequency = noteD;
      break;
    case 'E':
      frequency = noteE;
      break;
    case 'F':
      frequency = noteF;
      break;
    default:
      return; // If the note is not recognized, do nothing
  }
  tone(buzzerPin, frequency, 500); // Play the note for 500 ms
}