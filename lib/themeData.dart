import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

ThemeData buildTheme() {
  const Color primaryColor = Color(0xFF64FFDA); // Teal accent
  const Color backgroundColor = Color(0xFF0A192F); // Deep Navy
  const Color surfaceColor = Color(0xFF112240); // Lighter Navy for cards
  const Color textColorMain = Color(0xFFCCD6F6);
  const Color textColorDim = Color(0xFF8892B0);

  return ThemeData(
    brightness: Brightness.dark,
    primaryColor: primaryColor,
    scaffoldBackgroundColor: backgroundColor,
    canvasColor: surfaceColor,
    colorScheme: const ColorScheme.dark(
      primary: primaryColor,
      surface: surfaceColor,
      onSurface: textColorMain,
      onPrimary: backgroundColor,
    ),
    textTheme: TextTheme(
      displayLarge: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: textColorMain,
          fontSize: 64,
          fontWeight: FontWeight.bold,
        ),
      ),
      displayMedium: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: textColorMain,
          fontSize: 48,
          fontWeight: FontWeight.bold,
        ),
      ),
      displaySmall: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: textColorMain,
          fontSize: 32,
          fontWeight: FontWeight.bold,
        ),
      ),
      headlineMedium: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: primaryColor,
          fontSize: 24,
          fontWeight: FontWeight.w600,
        ),
      ),
      bodyLarge: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: textColorDim,
          fontSize: 18,
          height: 1.6,
        ),
      ),
      bodyMedium: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: textColorDim,
          fontSize: 16,
          height: 1.5,
        ),
      ),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: backgroundColor.withOpacity(0.8),
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.jura(
        textStyle: const TextStyle(
          color: primaryColor,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
      ),
      iconTheme: const IconThemeData(color: primaryColor),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: backgroundColor,
        backgroundColor: primaryColor,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
        textStyle: GoogleFonts.jura(
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primaryColor,
        textStyle: GoogleFonts.jura(
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),
  );
}
