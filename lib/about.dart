import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:responsive_framework/responsive_framework.dart';

class AboutSection extends StatefulWidget {
  const AboutSection({super.key});

  @override
  State<AboutSection> createState() => _AboutSectionState();
}

class _AboutSectionState extends State<AboutSection> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          SizedBox(
            height: ResponsiveBreakpoints.of(context).between(MOBILE, TABLET)
                ? 100
                : 200,
          ),
          ClipOval(
            child: Image.asset(
              'assets/me.jpg',
              height: 180,
              width: 180,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(
            height: 15,
          ),
          const Text(
            'Hi, I’m Gerry Albert Buala',
            style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
          ),
          const Text(
            'Flutter Developer',
            style: TextStyle(fontSize: 26),
          ),
          const SizedBox(
            height: 15,
          ),
          const Text(
            'I’m a Flutter developer from the Philippines. My passion is creating user-friendly apps that meet real needs. Explore my portfolio to see what I’ve been working on.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 22,
            ),
          ),
          const SizedBox(
            height: 25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              InkWell(
                  hoverColor: Colors.transparent,
                  onTap: () {
                    _launchUrl('https://www.facebook.com/daedalus05/');
                  },
                  child: SvgPicture.asset('assets/icons/fb.svg')),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 15.0),
                child: InkWell(
                    hoverColor: Colors.transparent,
                    onTap: () {
                      _launchUrl('https://github.com/gerry05');
                    },
                    child: SvgPicture.asset('assets/icons/github.svg')),
              ),
              InkWell(
                  hoverColor: Colors.transparent,
                  onTap: () {
                    _launchUrl(
                        'https://www.linkedin.com/in/gerry-albert-buala-6ba2a1168/');
                  },
                  child: SvgPicture.asset('assets/icons/linkedin.svg')),
            ],
          ),
          const SizedBox(
            height: 50,
          ),
        ],
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
