import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'about.dart';
import 'projects.dart';
import 'skills.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final aboutKey = GlobalKey();
  final skillsKey = GlobalKey();
  final projectsKey = GlobalKey();

  double actionTitleFontSize = 32.0;
  final ScrollController _scrollController = ScrollController();
  bool _showAppBar = true;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (_scrollController.position.userScrollDirection ==
          ScrollDirection.reverse) {
        if (_showAppBar) setState(() => _showAppBar = false);
      } else if (_scrollController.position.userScrollDirection ==
          ScrollDirection.forward) {
        if (!_showAppBar) setState(() => _showAppBar = true);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (ResponsiveBreakpoints.of(context).equals(MOBILE)) {
      actionTitleFontSize = 18.0;
    } else if (ResponsiveBreakpoints.of(context).equals(TABLET)) {
      actionTitleFontSize = 24.0;
    } else {
      actionTitleFontSize = 32.0;
    }
    return Stack(children: [
      Container(
        color: const Color(0xFF131313),
      ),
      Padding(
        padding: EdgeInsets.symmetric(
            horizontal: ResponsiveBreakpoints.of(context).equals(DESKTOP)
                ? MediaQuery.of(context).size.width * 0.1
                : MediaQuery.of(context).size.width * 0.05,
            vertical: 25),
        child: Scaffold(
          appBar: _showAppBar
              ? AppBar(
                  title: Text('<G.A>',
                      style: TextStyle(fontSize: actionTitleFontSize)),
                  actions: [
                    Padding(
                      padding: const EdgeInsets.only(right: 30.0),
                      child: TextButton(
                        onPressed: () {
                          scrollTo(aboutKey);
                        },
                        child: Text("About",
                            style: TextStyle(fontSize: actionTitleFontSize)),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(right: 30.0),
                      child: TextButton(
                        onPressed: () {
                          scrollTo(skillsKey);
                        },
                        child: Text("Skills",
                            style: TextStyle(fontSize: actionTitleFontSize)),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        scrollTo(projectsKey);
                      },
                      child: Text("Projects",
                          style: TextStyle(fontSize: actionTitleFontSize)),
                    )
                  ],
                )
              : null,
          body: SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                SizedBox(
                    height: MediaQuery.of(context).size.height,
                    child: AboutSection(
                      key: aboutKey,
                    )),
                SizedBox(
                    height: MediaQuery.of(context).size.height,
                    child: SkillsSection(
                      key: skillsKey,
                    )),
                SizedBox(
                    height: ResponsiveBreakpoints.of(context).equals(DESKTOP)
                        ? MediaQuery.of(context).size.height * 1.5
                        : MediaQuery.of(context).size.height * 2.3,
                    child: ProjectsSection(
                      key: projectsKey,
                    )),
                SizedBox(
                    height: MediaQuery.of(context).size.height * 0.2,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text("Powered by Flutter Web",
                            style: TextStyle(
                                fontSize: 24, fontWeight: FontWeight.bold)),
                        SvgPicture.asset('assets/icons/flutter.svg'),
                      ],
                    )),
              ],
            ),
          ),
        ),
      ),
    ]);
  }

  scrollTo(GlobalKey key) {
    Scrollable.ensureVisible(key.currentContext!,
        duration: const Duration(milliseconds: 1000), curve: Curves.easeOut);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
}
