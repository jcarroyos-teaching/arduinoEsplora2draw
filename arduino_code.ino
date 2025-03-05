#include <Esplora.h>
#include <TFT.h>
#include <SPI.h>

// Definir pines para la pantalla TFT
#define cs   7    // Pin Chip Select
#define dc   0    // Pin Data/Command
#define rst  1    // Pin Reset

// Crear objeto TFT
TFT pantalla = TFT(cs, dc, rst);

// Variables para almacenar lecturas anteriores
int prevJoystickX = 0;
int prevJoystickY = 0;
int prevLight = 0;
int prevTemperature = 0;
int prevSlider = 0;
int prevMicrophone = 0;
int prevAccelX = 0;
int prevAccelY = 0;
int prevAccelZ = 0;
int prevButton1 = 0;
int prevButton2 = 0;
int prevButton3 = 0;
int prevButton4 = 0;

void setup() {
  // Iniciar comunicación serial
  Serial.begin(9600);
  
  // Inicializar la pantalla TFT
  pantalla.begin();
  pantalla.background(0, 0, 0);  // Fondo negro
  
  // Establecer color de texto
  pantalla.stroke(255, 255, 255);  // Texto blanco
  
  // Establecer tamaño de texto
  pantalla.setTextSize(1);
}

void drawIfChanged(int x, int y, const String& label, int currentValue, int& prevValue) {
  if (currentValue != prevValue) {
    // Borrar área específica
    pantalla.stroke(0, 0, 0);
    pantalla.fill(0, 0, 0);
    pantalla.rect(x, y, 120, 10);
    
    // Dibujar nuevo valor
    pantalla.stroke(255, 255, 255);
    pantalla.setCursor(x, y);
    pantalla.print(label);
    pantalla.print(currentValue);
    
    // Actualizar valor previo
    prevValue = currentValue;
  }
}

void loop() {
    // Leer sensores de la Esplora
    int joystickX = Esplora.readJoystickX();
    int joystickY = Esplora.readJoystickY();
    int light = Esplora.readLightSensor();
    int temperature = Esplora.readTemperature(0);
    int slider = Esplora.readSlider();
    int microphone = Esplora.readMicrophone();
    int accelX = Esplora.readAccelerometer(X_AXIS);
    int accelY = Esplora.readAccelerometer(Y_AXIS);
    int accelZ = Esplora.readAccelerometer(Z_AXIS);
    int button1 = Esplora.readButton(SWITCH_1);
    int button2 = Esplora.readButton(SWITCH_2);
    int button3 = Esplora.readButton(SWITCH_3);
    int button4 = Esplora.readButton(SWITCH_4);
    
    // Enviar datos por Serial - CORREGIDO con coma antes del último valor
    Serial.print(joystickX); Serial.print(",");
    Serial.print(joystickY); Serial.print(",");
    Serial.print(light); Serial.print(",");
    Serial.print(temperature); Serial.print(",");
    Serial.print(slider); Serial.print(",");
    Serial.print(microphone); Serial.print(",");
    Serial.print(accelX); Serial.print(",");
    Serial.print(accelY); Serial.print(",");
    Serial.print(accelZ); Serial.print(",");
    Serial.print(button1); Serial.print(",");
    Serial.print(button2); Serial.print(",");
    Serial.print(button3); Serial.print(",");  // Coma añadida aquí
    Serial.println(button4);

    // Dibujar solo si los valores han cambiado
    drawIfChanged(0, 0, "Joystick X: ", joystickX, prevJoystickX);
    drawIfChanged(0, 10, "Joystick Y: ", joystickY, prevJoystickY);
    drawIfChanged(0, 20, "Luz: ", light, prevLight);
    drawIfChanged(0, 30, "Temp: ", temperature, prevTemperature);
    drawIfChanged(0, 40, "Slider: ", slider, prevSlider);
    drawIfChanged(0, 50, "Microfono: ", microphone, prevMicrophone);
    drawIfChanged(0, 60, "Acel X: ", accelX, prevAccelX);
    drawIfChanged(0, 70, "Acel Y: ", accelY, prevAccelY);
    drawIfChanged(0, 80, "Acel Z: ", accelZ, prevAccelZ);

    // Mostrar estado de botones con colores
    pantalla.setCursor(0, 90);
    pantalla.print("Botones: ");
    
    pantalla.stroke(button1 ? 255 : 0, 0, 0);  // Rojo si presionado
    pantalla.print("1 ");
    pantalla.stroke(button2 ? 255 : 0, 0, 0);
    pantalla.print("2 ");
    pantalla.stroke(button3 ? 255 : 0, 0, 0);
    pantalla.print("3 ");
    pantalla.stroke(button4 ? 255 : 0, 0, 0);
    pantalla.print("4");

    // Pequeño retraso para estabilidad
    delay(100);
}