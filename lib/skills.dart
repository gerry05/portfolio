import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:responsive_framework/responsive_framework.dart';

class SkillsSection extends StatefulWidget {
  const SkillsSection({super.key});

  @override
  State<SkillsSection> createState() => _SkillsSectionState();
}

class _SkillsSectionState extends State<SkillsSection> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          const Text(
            'Skills',
            style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
          ),
          const SizedBox(
            height: 100,
          ),
          Wrap(
            spacing: 100,
            children: [
              buildItem('Mobile Development', [
                SvgPicture.asset('assets/icons/android.svg'),
                SvgPicture.asset('assets/icons/java.svg'),
                SvgPicture.asset('assets/icons/flutter.svg'),
                SvgPicture.asset('assets/icons/dart.svg'),
              ]),
              buildItem('Web Development', [
                SvgPicture.asset('assets/icons/html5.svg'),
                SvgPicture.asset('assets/icons/css3.svg'),
                SvgPicture.asset('assets/icons/bootstrap.svg'),
                SvgPicture.asset('assets/icons/js.svg'),
                SvgPicture.asset('assets/icons/php.svg'),
                SvgPicture.asset('assets/icons/jquery.svg'),
              ]),
            ],
          ),
          const SizedBox(
            height: 50,
          ),
          Wrap(
            spacing: 100,
            children: [
              buildItem('Backend', [
                SvgPicture.asset('assets/icons/php.svg'),
                SvgPicture.asset(
                  'assets/icons/nodejs.svg',
                  height: 70,
                ),
                SvgPicture.asset('assets/icons/firebase.svg'),
                SvgPicture.asset('assets/icons/mysql.svg'),
              ]),
              buildItem('Others', [
                SvgPicture.asset('assets/icons/github.svg'),
                SvgPicture.asset('assets/icons/git.svg'),
                SvgPicture.asset('assets/icons/vscode.svg'),
                SvgPicture.asset('assets/icons/androidstudio.svg'),
                SvgPicture.asset('assets/icons/npm.svg'),
              ]),
            ],
          ),
        ],
      ),
    );
  }

  Widget buildItem(String title, List<Widget> icons) {
    double bottomPadding = 20.0;
    Widget titleWidget = Text(
      title,
      style: const TextStyle(fontSize: 24),
    );
    Widget iconsWidget = Wrap(
      crossAxisAlignment: WrapCrossAlignment.end,
      children: icons,
    );
    return Container(
      margin: EdgeInsets.only(bottom: bottomPadding),
      child: Column(
        children: [
          ResponsiveBreakpoints.of(context).between(MOBILE, TABLET)
              ? Center(child: titleWidget)
              : titleWidget,
          const SizedBox(height: 25),
          ResponsiveBreakpoints.of(context).between(MOBILE, TABLET)
              ? Center(child: iconsWidget)
              : iconsWidget,
        ],
      ),
    );
  }
}
