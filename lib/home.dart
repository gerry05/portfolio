import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
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

  final ScrollController _scrollController = ScrollController();
  bool _showAppBar = true;
  double _lastScrollOffset = 0;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      double currentOffset = _scrollController.offset;
      if (currentOffset > _lastScrollOffset && currentOffset > 100) {
        if (_showAppBar) setState(() => _showAppBar = false);
      } else {
        if (!_showAppBar) setState(() => _showAppBar = true);
      }
      _lastScrollOffset = currentOffset;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(70),
        child: AnimatedSlide(
          offset: _showAppBar ? Offset.zero : const Offset(0, -1),
          duration: const Duration(milliseconds: 300),
          child: Container(
            decoration: BoxDecoration(
              color: Theme.of(context).scaffoldBackgroundColor.withOpacity(0.8),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 10,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Padding(
                padding: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 0.05),
                child: Text(
                  '<G.A>',
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              actions: [
                _navButton("About", aboutKey),
                _navButton("Skills", skillsKey),
                _navButton("Projects", projectsKey),
                SizedBox(width: MediaQuery.of(context).size.width * 0.05),
              ],
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
            AboutSection(key: aboutKey),
            SkillsSection(key: skillsKey),
            ProjectsSection(key: projectsKey),
            const FooterSection(),
          ],
        ),
      ),
    );
  }

  Widget _navButton(String text, GlobalKey key) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: TextButton(
        onPressed: () => scrollTo(key),
        child: Text(
          text,
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
      ),
    );
  }

  scrollTo(GlobalKey key) {
    Scrollable.ensureVisible(
      key.currentContext!,
      duration: const Duration(milliseconds: 800),
      curve: Curves.easeInOutCubic,
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
}

class FooterSection extends StatelessWidget {
  const FooterSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40),
      child: Column(
        children: [
          const Divider(indent: 100, endIndent: 100),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Built with ",
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const Icon(Icons.favorite, color: Colors.red, size: 16),
              Text(
                " using Flutter",
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            "© 2026 Gerry Albert Buala",
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
