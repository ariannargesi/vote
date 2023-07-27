import Button from "@/components/Button";
import Link from "next/link";
import paths from "@/app/paths";
import { Header, Content, Page  } from '@/app/cmp/shared/layouts'

export default function NotFound() {
  return (
    <Page>
      <Header title={"۴۰۴"} />   
      <Content>
        <div className="h-full flex justify-center items-center flex-col gap-y-4">
          <h1 className="text-3xl font-bold">پیدا نشد!</h1>
          <h2>چیزی که میخوای وجود نداره یا احتمالا پاک شده</h2>
          <Link href={paths.home}>
            <Button color="primary">برو به صفحه اصلی</Button>
          </Link>
        </div>
      </Content>
    </Page>
  );
}
