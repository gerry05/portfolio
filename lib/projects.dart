import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:insta_image_viewer/insta_image_viewer.dart';

class ProjectsSection extends StatefulWidget {
  const ProjectsSection({super.key});

  @override
  State<ProjectsSection> createState() => _ProjectsSectionState();
}

class _ProjectsSectionState extends State<ProjectsSection> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          const Text(
            'Projects',
            style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
          ),
          const SizedBox(
            height: 100,
          ),
          Wrap(
            children: [
              buildItem(
                title: 'Learnpod',
                toolsIcons: ['android', 'flutter', 'firebase', 'nodejs'],
                imageName: 'assets/projects/learnpod.png',
                imageWidth: 300,
              ),
              buildItem(
                title: 'Libot',
                toolsIcons: ['android', 'flutter', 'firebase'],
                imageName: 'assets/projects/libot.png',
                imageWidth: 300,
              ),
              buildItem(
                title: 'Cognitv',
                toolsIcons: ['android', 'java'],
                imageName: 'assets/projects/Cognitv.png',
                imageWidth: 300,
              ),
              buildItem(
                title: 'Swift',
                toolsIcons: ['android', 'java', 'firebase'],
                imageName: 'assets/projects/Swift.png',
                imageWidth: 300,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget buildItem({
    required String title,
    required List<String> toolsIcons,
    required String imageName,
    required double imageWidth,
  }) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double width = constraints.maxWidth / 2 - 30;
        if (ResponsiveBreakpoints.of(context).smallerThan(DESKTOP)) {
          width = constraints.maxWidth;
        }
        return SizedBox(
          height: 400,
          width: width,
          child: Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                child: InstaImageViewer(
                    child: Image.asset(
                  imageName,
                  width: imageWidth,
                )),
              ),
              SizedBox(
                width:
                    ResponsiveBreakpoints.of(context).equals(DESKTOP) ? 50 : 10,
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(
                      height: 25,
                    ),
                    Text(
                      title,
                      style: const TextStyle(
                          fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(
                      height: 25,
                    ),
                    Wrap(
                      spacing: 8.0, // Adjust spacing as needed
                      runSpacing: 4.0, // Adjust run spacing as needed
                      children: toolsIconsList(toolsIcons),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  List<Widget> toolsIconsList(List<String> icons) {
    double size = 48;

    List<Widget> widgets = [];
    for (int i = 0; i < icons.length; i++) {
      widgets.add(SvgPicture.asset(
        'assets/icons/${icons[i]}.svg',
        height: size,
      ));
    }
    return widgets;
  }
}
