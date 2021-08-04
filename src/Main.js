import React from "react";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";

const Main = () => {
	return (
		<>
			<Header />
			<div className='main_wrap'>
				<div className='main_visual'>
					<p className='s_tit'>
						リモートのプログラミングテストの監督サービス
					</p>
					<p className='b_tit'>
						<span>不正行為</span>の心配なしに
						<br />
						<span>プログラミングテスト</span>を
						<br /> <span>運営、監督</span>が可能です
					</p>
					<p className='s_txt'>
						学生のテスト環境をリアルタイムで監督し、
						<br />
						公正で透明なリモートテストを運営してみましょう。
					</p>
				</div>

				<div className='main_info_wrap'>
					<ul>
						<li className='ico01'>
							<p className='tit'>
								リモート環境でどのように
								<br />
								学生を監督しますか
							</p>
							<p className='txt'>
								学生側のWeb Camera, Mobile Camera, PC Screenの
								三つの画面共有を通して
								リアルタイムでの学生の監督が可能です。
							</p>
						</li>
						<li className='ico02'>
							<p className='tit'>
								アイトラッキング機能で
								<br />
								不正行為を探知します
							</p>
							<p className='txt'>
								アイトラッキング技術で 学生の視線を探知し、
								不正行為を画面に表示し、テストの監督が容易になります。
							</p>
						</li>
						<li className='ico03'>
							<p className='tit'>
								どんなプログラミング言語で
								<br />
								テストを作れますか
							</p>
							<p className='txt'>
								テストの際、Web Code Editorを提供し、 JavaScript
								Java phpの三つのプログラミング言語に
								対する実行結果をみることが可能です。
							</p>
						</li>
					</ul>
				</div>

				<div className='main_service_step'>
					<p className='tit'>
						手軽く便利なリモートのプログラミングテスト
					</p>
					<p className='s_tit'>
						テストはこのようなプロセスでおこないます。
					</p>

					<div className='step_img'>
						<ul>
							<li className='icon01'>
								<p className='tit'>
									<span>1</span>クラスの作成
								</p>
								<p className='txt'>
									先生がテストや学生を 管理するクラスを作成
								</p>
							</li>
							<li className='icon02'>
								<p className='tit'>
									<span>2</span>クラスの加入申請
								</p>
								<p className='txt'>
									学生がクラスの招待コード
									を使ってクラスの申し込み
								</p>
							</li>
							<li className='icon03'>
								<p className='tit'>
									<span>3</span>学生の加入承認
								</p>
								<p className='txt'>
									学生が申請した クラスの加入を承認
								</p>
							</li>
							<li className='icon04'>
								<p className='tit'>
									<span>4</span>テストの作成
								</p>
								<p className='txt'>
									テストでプログラミング言語
									日にちなとを指定してテスト作成
								</p>
							</li>
						</ul>
						<ul>
							<li className='icon05'>
								<p className='tit'>
									<span>5</span>問題の登録
								</p>
								<p className='txt'>
									テストの作成と 同時に問題の登録
								</p>
							</li>
							<li className='icon06'>
								<p className='tit'>
									<span>6</span>テストの開始や監督
								</p>
								<p className='txt'>
									学生はテストに参加、
									先生はテストの全過程を監督
								</p>
							</li>
							<li className='icon03'>
								<p className='tit'>
									<span>7</span>テストの採点
								</p>
								<p className='txt'>
									テストが終わってから
									先生は学生のテストを採点
								</p>
							</li>
							<li className='icon08'>
								<p className='tit'>
									<span>8</span>テストの点数確認
								</p>
								<p className='txt'>
									採点が終わったら、 学生はテストの点数を確認
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Main;
