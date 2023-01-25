import Head from "next/head";
import Image from "next/image";

export default function Home({ title, image, links }) {
  return (
    <div className="container">
      <Head>
        <title>Notion Links</title>
        <meta name="description" content="Notion links | Desi Code" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image src={image} className="avatar" width={75} height={75} />
      <h5>{title}</h5>
      {links.map((link) => (
        <a rel="noreferrer" target="_blank" key={link.name} href={link.url}>
          {link.name}
        </a>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  // const notion = new Client({
  //   auth: process.env.NOTION_SECRET,
  // });

  // const page = await notion.pages.retrieve({
  //   page_id: process.env.LINKS_PAGE_ID,
  // });

  // const blocks = await notion.blocks.children.list({
  //   block_id: process.env.LINKS_PAGE_ID,
  // });

  // const title = page.properties.title.title[0].plain_text;
  const links = [
    {
      name: "Facebook",
      url: "/",
    },
    {
      name: "Facebook",
      url: "/",
    },
  ];
  // let image = "";

  // blocks.results.forEach((block) => {
  //   if (block.type === "image") image = block.image.external.url;
  //   if (block.type === "paragraph")
  //     links.push({
  //       name: block.paragraph.text[0].plain_text,
  //       url: block.paragraph.text[0].href,
  //     });
  // });

  return {
    props: {
      title: "Heheheh",
      links,
      image: "https://placeholder.com/",
    },
    revalidate: 10,
  };
};
