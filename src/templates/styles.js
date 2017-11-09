export default `
  <style>
    *{
      padding: 0;
      margin: 0;
    }
    .quantity{
      position: absolute;
      top: 95px;
      left: 94px;
      width: 25px;
      text-align: center;
      padding 3px;
      background: rgba(0, 0, 0, .2);
      border-radius: 100%;
    }
    img {
      height: 100px;
      width: 100px;
    }
    #price-value{
      padding-top: 60px;
    }
    .a-price {
      padding: 20px;
      position: relative;
    }
    .a-price:nth-child(even) {
      background: #546E7A;
      color: white;
    }
    .a-price:nth-child(odd) {
      background: #607D8B;
      color: white;
    }
    p {
     font-size: 32px;
    }
    .a-price p, .a-price img {
      display: inline-block;
      padding: 10px;
      vertical-align: middle;
    }
    .toolbar{
      position: fixed;
      width: 100%;
      height: 60px;
      background: #0097A7;
      text-align: center;
      z-index: 1;
      color: white;
      padding: 20px;
      box-sizing: border-box;
    }
  </style>
`;
