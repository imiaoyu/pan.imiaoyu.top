//启动页面
import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pan/widgets/LoginPage.dart';
import 'package:pan/widgets/boottom_navigator.dart';
import 'package:shared_preferences/shared_preferences.dart';
class LaunchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LaunchPageWidget();
  }
}

class LaunchPageWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => LaunchState();
}

class LaunchState extends State<LaunchPageWidget> {
  final String launchImage =
      "http://pan-qiniu.imiaoyu.top/1613886222294.jpeg";
  int _countdown = 5;
  Timer _countdownTimer;

  @override
  void initState() {
    super.initState();
    _startRecordTime();
    print('初始化启动页面');
  }

  @override
  void dispose() {
    super.dispose();
    print('启动页面结束');
    if (_countdownTimer != null && _countdownTimer.isActive) {
      _countdownTimer.cancel();
      _countdownTimer = null;
    }
  }

  void _startRecordTime() {
    _countdownTimer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() async {
        if (_countdown <= 1) {
//          Navigator.of(context).pushNamed("/demo1");

          SharedPreferences prefs = await SharedPreferences.getInstance();
          int  uid =prefs.getInt("uid");

          if(uid != null){
            Navigator.of(context).pop();
            Navigator.of(context).push(MaterialPageRoute(builder: (context) {
              return BottomNavigatorBarDemo();
            }));
          }else{
            Navigator.of(context).pop();
            Navigator.of(context).push(MaterialPageRoute(builder: (context) {
              return LoginPage();
            }));
          }


          _countdownTimer.cancel();
          _countdownTimer = null;
        } else {
          _countdown -= 1;
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: Scaffold(
        body: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            Image.network(launchImage, fit: BoxFit.fill),
            Positioned(
              top: 30,
              right: 30,
              child: Container(
                padding: EdgeInsets.fromLTRB(5, 2, 5, 2),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.black12,
                ),
                child: RichText(
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text: '$_countdown',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.blue,
                        )),
                    TextSpan(
                        text: '跳过',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.red,
                        )),
                  ]),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
