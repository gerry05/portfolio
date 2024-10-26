import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

ThemeData buildTheme() {
  const Color textColorWhite = Colors.white;
  const Color backgroundColorWhite = Colors.white;
  return ThemeData(
    brightness: Brightness.dark, // Ensures dark theme
    primaryColor: Colors.white,
    scaffoldBackgroundColor: Colors.transparent,
    textTheme: TextTheme(
      bodyLarge:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      bodyMedium:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      bodySmall:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      titleLarge: GoogleFonts.jura(
          textStyle: const TextStyle(color: textColorWhite)), // AppBar title
      titleSmall:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      titleMedium:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      labelLarge:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      labelMedium:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      labelSmall:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      displayLarge:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      displayMedium:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      displaySmall:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      headlineLarge:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      headlineMedium:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
      headlineSmall:
          GoogleFonts.jura(textStyle: const TextStyle(color: textColorWhite)),
    ),
    appBarTheme: AppBarTheme(
      color: Colors.transparent, // AppBar background color
      titleTextStyle: GoogleFonts.jura(
          textStyle: const TextStyle(color: textColorWhite, fontSize: 32)),
      iconTheme: const IconThemeData(color: textColorWhite),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: backgroundColorWhite,
        backgroundColor: Colors.blue, // Button text color
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: textColorWhite, // Button text color
      ),
    ),
  );
}
