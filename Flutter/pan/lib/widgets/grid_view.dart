import 'package:flutter/material.dart';
import 'package:pan/res/listData.dart';
import 'package:pan/widgets/LoginPage.dart';
import 'package:shared_preferences/shared_preferences.dart';
void main(){
  runApp(Gridview());
}

// 抽离成一个单独的组件
class Gridview extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        // 导航条
        appBar:AppBar(
            title:Text('Flutter App'),
            actions: [
        IconButton(
        icon: Icon(Icons.cancel),
        onPressed: () async {

          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.clear();

          Navigator.of(context).pushAndRemoveUntil(
              new MaterialPageRoute(builder: (context) => new LoginPage()
              ), (route) => route == null);

        },
      ),
      ],
        ),
        // 主体
        body:HomeContent(
        ),
      ),
      theme: ThemeData(primarySwatch:Colors.yellow),
    );
  }
}



// 用flutter的builder生成网格
class HomeContent extends StatelessWidget{
  Widget _getListData(context,index){
    return Container(
      // 子元素
      child:Column(
        // 子元素
        children: <Widget>[

//          设置点击
          InkWell(
            // 图片
            child: Image.network(
                listData[index]['imageUrl'],
                height: 150,
                cacheWidth: 150,
                fit: BoxFit.cover,
            ),
            onTap: (){
              print(listData[index]['title']);
            },
          ),
          // 图片与文字的间隔使用
          SizedBox(height:12),
          InkWell(
            // 文字
              child: Text(
                  listData[index]['title'],
                  textAlign:TextAlign.center,
                  style:TextStyle(fontSize: 18)
              ),
              onTap: null)

        ],
      ),
      // 装饰
      decoration: BoxDecoration(
        // 边框
          border:Border.all(
            // 颜色
              color:Color.fromRGBO(233, 233, 233, 0.8),
              // 边框宽度
              width:1.0
          )
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // 网格构造器
    return  GridView.builder(
      // 定义网格相关样式
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          // 定义列
          crossAxisCount: 2,
          // 横向间隙
          mainAxisSpacing: 10.0,
          // 纵向间隙
          crossAxisSpacing: 10.0,
        ),
        // 数据数量
        itemCount: listData.length,
        // 所有数据
        itemBuilder:this._getListData
    );
  }
}
