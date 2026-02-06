import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:insta_image_viewer/insta_image_viewer.dart';
import 'package:url_launcher/url_launcher.dart';

class ProjectsSection extends StatefulWidget {
  const ProjectsSection({super.key});

  @override
  State<ProjectsSection> createState() => _ProjectsSectionState();
}

class _ProjectsSectionState extends State<ProjectsSection> {
  final List<Map<String, dynamic>> projects = [
    {
      'title': 'TaraSnap',
      'tools': ['android', 'flutter', 'supabase'],
      'image': 'assets/projects/tarasnap.png',
      'website': 'https://tarasnap.com'
    },
    {
      'title': 'RealtyTrack Offline',
      'tools': ['android', 'flutter'],
      'image': 'assets/projects/realtytrack.png'
    },
    {
      'title': 'WordHunt',
      'tools': ['android', 'web', 'flutter', 'generative_ai'],
      'image': 'assets/projects/wordhunt.png',
      'website': 'https://gerry05.github.io/wordhunt',
    },
    {
      'title': 'Learnpod',
      'tools': ['android', 'flutter', 'firebase', 'nodejs'],
      'image': 'assets/projects/learnpod.png',
    },
    {
      'title': 'Libot',
      'tools': ['android', 'flutter', 'firebase'],
      'image': 'assets/projects/libot.png',
    },
    {
      'title': 'Cognitv',
      'tools': ['android', 'java'],
      'image': 'assets/projects/Cognitv.png',
    },
    {
      'title': 'Swift',
      'tools': ['android', 'java', 'firebase'],
      'image': 'assets/projects/Swift.png',
    },
  ];

  Future<void> _launchURL(String url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw Exception('Could not launch $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1000),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    '03.',
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontFamily: 'Courier',
                      fontSize: 20,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Text(
                    'Some Things I’ve Built',
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
                spacing: 30,
                runSpacing: 30,
                alignment: WrapAlignment.center,
                children: projects.map((project) {
                  return SizedBox(
                    width:
                        ResponsiveBreakpoints.of(context).smallerThan(DESKTOP)
                            ? double.infinity
                            : 480,
                    child: _ProjectCard(
                      title: project['title'] as String,
                      toolsIcons: project['tools'] as List<String>,
                      imageName: project['image'] as String,
                      website: (project['website'] ?? '') as String,
                      onTap: () {
                        if (project['website'] != null &&
                            (project['website'] as String).isNotEmpty) {
                          _launchURL(project['website'] as String);
                        }
                      },
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 100), // Extra spacing to prevent overflow
            ],
          ),
        ),
      ),
    );
  }
}

class _ProjectCard extends StatefulWidget {
  final String title;
  final List<String> toolsIcons;
  final String imageName;
  final String website;
  final VoidCallback onTap;

  const _ProjectCard({
    required this.title,
    required this.toolsIcons,
    required this.imageName,
    required this.website,
    required this.onTap,
  });

  @override
  State<_ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<_ProjectCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          color: theme.canvasColor,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(_isHovered ? 0.3 : 0.1),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image Section
            ClipRRect(
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(12)),
              child: Stack(
                children: [
                  InstaImageViewer(
                    child: Image.asset(
                      widget.imageName,
                      width: double.infinity,
                      height: 250,
                      fit: BoxFit.fitHeight,
                    ),
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.5),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.fullscreen,
                          color: Colors.white, size: 20),
                    ),
                  ),
                ],
              ),
            ),
            // Content Section
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.title,
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontSize: 22,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 12,
                    runSpacing: 8,
                    children: widget.toolsIcons.map((icon) {
                      return SvgPicture.asset(
                        'assets/icons/$icon.svg',
                        height: 30,
                        width: 30,
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 24),
                  if (widget.website.isNotEmpty)
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton.icon(
                        onPressed: widget.onTap,
                        icon: const Icon(Icons.open_in_new, size: 18),
                        label: const Text('View Site'),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: theme.primaryColor),
                          foregroundColor: theme.primaryColor,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
