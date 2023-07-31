import React from "react";
import { Page, Header, Footer, Content } from "../cmp/shared/layouts";
import ScoreAction from "../cmp/shared/ScoreAction";

export default function Poll() {
  return (
    <Page>
      <Header />
      <Content extendClass="px-2 pt-6 space-y-3">
        <h1 className="font-bold text-xl">
          نظر شما در مورد عملکرد شهردار رشت چیست؟
        </h1>
          <div className="flex gap-x-3 pr-2">
            <ScoreAction />
            <p>
              حرف های نگفته‌مان جایی در حافظه سلول های بدن ذخیره می‌شود. روان،
              آنچه توان بروزش را ندارد به جسم امانت میسپارد. و تنش و اضطراب
              اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی برای بروز می‌ماند.و تنش و اضطراب
              اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی برای بروز می‌ماند.و تنش و اضطراب
              اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی برای بروز می‌ماند.و تنش و اضطراب
              اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی برای بروز می‌ماند.
            </p>
          </div>
      </Content>
      {/* <Footer></Footer> */}
    </Page>
  );
}
