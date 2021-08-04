import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(Square());
}

class Car {

  //构造函数
  const Car({
    this.name,
    this.imageUrl,
  });

  final String name;
  final String imageUrl;
}



//定义一个全局的变量：模型数组
final List<Car> datas = [
  Car(
    name: '保时捷918 Spyder',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-7d8be6ebc4c7c95b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '兰博基尼Aventador',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-e3bfd824f30afaac?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '法拉利Enzo',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-a1d64cf5da2d9d99?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: 'Zenvo ST1',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-bf883b46690f93ce?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '迈凯伦F1',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-5a7b5550a19b8342?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '萨林S7',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-2e128d18144ad5b8?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '科尼赛克CCR',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-01ced8f6f95219ec?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '布加迪Chiron',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-7fc8359eb61adac0?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '轩尼诗Venom GT',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-d332bf510d61bbc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  Car(
    name: '西贝尔Tuatara',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-3dd9a70b25ae6bc9?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  )
];


class Square extends StatelessWidget {
  //带下划线表示私有的,不带下划线表示共有的
  Widget _cellForRow(BuildContext context, int index) {
    return Container( //布局类似
      color: Colors.white,
      margin: EdgeInsets.all(10),
      child: Column( //Stack:相对布局 、Row
        children: <Widget>[
//          Image.network('http://pan-qiniu.imiaoyu.top/%E7%AE%80%E7%BA%A64k%E9%A3%8E%E6%99%AF%E5%A3%81%E7%BA%B83840x2160.jpg'),
          InkWell(
            child: Image.network(datas[index].imageUrl),
            onTap: () {
              print(datas[index].name);
            },
          ),

          SizedBox(height: 10,),
          Text(datas[index].name, style: TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 18.0,
            fontStyle: FontStyle.values[1],
          ),),
        ],
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text('Flutter Demo'),
      ),
      body: ListView.builder( //没有Section
        itemCount: datas.length,
        itemBuilder: _cellForRow, //渲染,返回每一个Item
      ),
    );
  }


}
