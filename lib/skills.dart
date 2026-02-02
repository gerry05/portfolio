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
    final theme = Theme.of(context);
    final isMobile = ResponsiveBreakpoints.of(context).smallerThan(TABLET);

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Text(
                '02.',
                style: theme.textTheme.headlineMedium?.copyWith(
                  fontFamily: 'Courier',
                  fontSize: 20,
                ),
              ),
              const SizedBox(width: 10),
              Text(
                'Skills',
                style: theme.textTheme.displaySmall,
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Divider(
                  color: theme.primaryColor.withOpacity(0.3),
                  thickness: 1,
                ),
              ),
            ],
          ),
          const SizedBox(height: 50),
          Wrap(
            spacing: 20,
            runSpacing: 20,
            alignment: WrapAlignment.center,
            children: [
              _buildSkillCard(
                'Mobile Development',
                ['android', 'java', 'flutter', 'dart'],
                isMobile,
              ),
              // _buildSkillCard(
              //   'Web Development',
              //   ['html5', 'css3', 'bootstrap', 'js', 'php', 'jquery'],
              //   isMobile,
              // ),
              _buildSkillCard(
                'Backend & Database',
                ['nodejs', 'firebase', 'mysql', 'supabase'],
                isMobile,
              ),
              _buildSkillCard(
                'Tools & Others',
                ['github', 'git', 'vscode', 'androidstudio', 'npm'],
                isMobile,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSkillCard(String title, List<String> iconNames, bool isMobile) {
    final theme = Theme.of(context);
    return Container(
      width: isMobile ? double.infinity : 400,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.canvasColor,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: theme.textTheme.headlineMedium?.copyWith(
              fontSize: 18,
              color: theme.primaryColor,
            ),
          ),
          const SizedBox(height: 20),
          Wrap(
            spacing: 15,
            runSpacing: 15,
            children: iconNames.map((icon) => _buildSkillIcon(icon)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSkillIcon(String name) {
    return Tooltip(
      message: name.toUpperCase(),
      child: SvgPicture.asset(
        'assets/icons/$name.svg',
        height: 40,
        width: 40,
        // Using ColorFilter to make icons slightly dim until hovered (conceptually)
        // For now, just consistent sizing
      ),
    );
  }
}
