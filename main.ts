input.onGesture(Gesture.TiltRight, function () {
    serialmp3.runMp3Command(Mp3Command.PLAY_NEXT_TRACK)
})
input.onGesture(Gesture.ScreenDown, function () {
    serialmp3.runMp3Command(Mp3Command.PAUSE)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.setLedColor(0x00ff00)
    Titel += -1
    fTitelName(Ordner, Titel)
})
function fTitelName (pOrdner: number, pTitel: number) {
    if (pOrdner == 1 && lcd16x2rgb.between(pTitel, 0, 15)) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(Ordner1()[pTitel]))
    } else if (pOrdner == 3 && lcd16x2rgb.between(pTitel, 0, 12)) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(Ordner3Tabaluga()[pTitel]))
    } else {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text("Ordner" + pOrdner + " Titel" + pTitel))
    }
}
input.onGesture(Gesture.TiltLeft, function () {
    serialmp3.runMp3Command(Mp3Command.PLAY_PREVIOUS_TRACK)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (Titel == 0) {
        serialmp3.playMp3Folder(Ordner, Mp3Repeat.No)
    } else {
        serialmp3.playMp3TrackFromFolder(Titel, Ordner, Mp3Repeat.No)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.setLedColor(0x00ff00)
    Titel += 1
    fTitelName(Ordner, Titel)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Hold), function () {
    basic.setLedColor(0xff0000)
    Ordner += -1
    fTitelName(Ordner, Titel)
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Hold), function () {
    basic.setLedColor(0xff0000)
    Ordner += 1
    fTitelName(Ordner, Titel)
})
serialmp3.onMp3TrackStarted(function () {
    basic.setLedColor(0x0000ff)
    fTitelName(serialmp3.mp3Folder(), serialmp3.mp3Track())
})
function Ordner1 () {
    return [
    "Ordner 1 spielen",
    "Das Lied der Schlümpfe",
    "2 Macarena",
    "Pack die Badehose ein",
    "4 Das Buch",
    "5 Nessaja",
    "Fang das Licht",
    "Sommer in Germany",
    "Sandmann lieber Sandmann",
    "Blaue Wimpel",
    "Sind die Lichter",
    "Dann geh doch zu Netto",
    "12 Oh Susi",
    "Vereinstanz",
    "Calliope Song",
    "Calliope Karaoke"
    ]
}
function Ordner3Tabaluga () {
    return [
    "Tabaluga spielen",
    "1 Einleitung",
    "2 Tyrion",
    "3 Tabaluga",
    "Lied des Mondes",
    "Arbeit ist das halbe Leben",
    "Riesen-Glück",
    "Der Baum des Lebens",
    "Drache und Salamander",
    "Kaulquappenschule",
    "Himmelsriesen",
    "Die Delphine",
    "12 Nessaja"
    ]
}
let Titel = 0
let Ordner = 0
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 2, lcd16x2rgb.lcd16x2_text("CO²"))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 8, 10, lcd16x2rgb.lcd16x2_text("ppm"))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 14, 15, lcd16x2rgb.lcd16x2_text("°C"))
serialmp3.connectSerialMp3(DigitalPin.C16, DigitalPin.C17)
Ordner = serialmp3.mp3Folder()
Titel = serialmp3.mp3Track()
fTitelName(Ordner, Titel)
lcd16x2rgb.comment("co2-mp3-lcd-62")
lcd16x2rgb.comment("3 Erweiterungen:")
lcd16x2rgb.comment("calliope-edu/co2-sensor-scd40")
lcd16x2rgb.comment("mkleinsb/pxt-serialmp3")
lcd16x2rgb.comment("calliope-net/lcd-16x2")
loops.everyInterval(5000, function () {
    lcd16x2rgb.comment("CO² und Temperatur messen aller 5 Sekunden")
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 4, 7, SCD40.get_co2(), lcd16x2rgb.eAlign.right)
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 12, 13, SCD40.get_temperature(SCD40.SCD40_T_UNIT.C))
})
