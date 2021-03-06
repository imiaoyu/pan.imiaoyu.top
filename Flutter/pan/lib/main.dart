import 'package:flutter/material.dart';
import 'package:pan/widgets/LoginPage.dart';
import 'package:pan/widgets/boottom_navigator.dart';
import 'package:pan/widgets/square.dart';
import 'package:pan/widgets/file_list.dart';
import 'package:pan/widgets/grid_view.dart';
import 'package:pan/widgets/sqflite.dart';
import 'package:pan/widgets/loading.dart';
void main() {
  runApp(MyApp());
}
final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: navigatorKey,
      debugShowCheckedModeBanner: false,
      routes: {
        "/": (context) => LaunchPage(),
        "login": (context) => LoginPage(),
        "navigator": (context) => BottomNavigatorBarDemo(),
        "square": (context) => Square(),
        "file_list": (context) => FileList(),
        "grid_view": (context) => Gridview(),
//        "sqlflite": (context) => Sqlflite(),
      },
//      initialRoute: "sqlflite",
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
