import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:responsive_framework/responsive_framework.dart';

class AboutSection extends StatefulWidget {
  const AboutSection({super.key});

  @override
  State<AboutSection> createState() => _AboutSectionState();
}

class _AboutSectionState extends State<AboutSection>
    with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
    _fadeAnimation = CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeIn,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeOutCubic,
    ));
    _fadeController.forward();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    final isMobile = ResponsiveBreakpoints.of(context).smallerThan(TABLET);

    return Container(
      width: double.infinity,
      height: size.height,
      alignment: Alignment.center,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: SlideTransition(
          position: _slideAnimation,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 900),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildProfileImage(),
                const SizedBox(height: 30),
                Text(
                  'Hi, I’m Gerry Albert Buala',
                  style: theme.textTheme.displaySmall?.copyWith(
                    color: theme.primaryColor,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  'Building seamless digital experiences.',
                  style: theme.textTheme.displayMedium?.copyWith(
                    fontSize: isMobile ? 36 : 48,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Text(
                    'I’m a Software Developer from the Philippines, specializing in crafting high-performance, user-centric applications. With expertise in Flutter and modern backend solutions, I transform complex ideas into intuitive digital products.',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyLarge,
                  ),
                ),
                const SizedBox(height: 40),
                _buildSocialIcons(),
                const SizedBox(height: 50),
                ElevatedButton(
                  onPressed: () {
                    // TODO: Link to resume or contact
                    _launchUrl(
                        'https://drive.google.com/file/d/1rzUN3WSUA2IUynxm3HPBdGecOjmGwBnv/view?usp=sharing');
                  },
                  child: const Text('Check out my resume!'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildProfileImage() {
    return Container(
      padding: const EdgeInsets.all(5),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: Theme.of(context).primaryColor, width: 2),
      ),
      child: ClipOval(
        child: Image.asset(
          'assets/me.jpg',
          height: 180,
          width: 180,
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _buildSocialIcons() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _socialIcon(
            'assets/icons/fb.svg', 'https://www.facebook.com/daedalus05/'),
        _socialIcon('assets/icons/github.svg', 'https://github.com/gerry05'),
        _socialIcon('assets/icons/linkedin.svg',
            'https://www.linkedin.com/in/gerry-albert-buala-6ba2a1168/'),
      ],
    );
  }

  Widget _socialIcon(String asset, String url) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: InkWell(
        onTap: () => _launchUrl(url),
        borderRadius: BorderRadius.circular(5),
        child: SvgPicture.asset(
          asset,
          height: 30,
        ),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final Uri url0 = Uri.parse(url);
    if (!await launchUrl(url0)) {
      throw Exception('Could not launch $url0');
    }
  }
}
