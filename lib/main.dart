import 'package:flutter/material.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'home.dart';
import 'themeData.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'G.A. Buala',
      theme: buildTheme(),
      builder: (context, child) =>
          ResponsiveBreakpoints.builder(child: child!, breakpoints: const [
        Breakpoint(start: 0, end: 450, name: MOBILE),
        Breakpoint(start: 451, end: 1023, name: TABLET),
        Breakpoint(start: 1024, end: 1920, name: DESKTOP),
        Breakpoint(start: 1921, end: double.infinity, name: '4K'),
      ]),
      home: const HomePage(),
    );
  }
}
