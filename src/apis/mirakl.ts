export type Celebrity = { name: string; age: number };

export type Cat = {
  id: number;
  name: string;
  description: string;
  celebrities: Celebrity[];
};

// satisfies doesn't want to work in codesandbox even if it should do!!!
const CATS: Cat[] = [
  {
    id: 1,
    name: "Persan",
    description:
      "Le Persan est l'une des races de chat les plus anciennes. Doté d'un caractère doux, c'est un chat à poils longs très calme et qui n'aime pas qu'on le brusque. Son confort se trouve dans un quotidien réglé à la lettre et dans des endroits calmes. Il est réfractaire aux changements d'habitudes et d'environnement. Ainsi, il doit manger à heure régulière et surtout ne pas être dérangé. Aucunement agressif, son humeur se manifeste surtout dans ses yeux plutôt qu'au son de sa voix. Il aime flemmarder et faire de longues siestes. S'il apprécie être câliné, il ne sera pas enclin à passer ses journées à se faire caresser. Les manipulations doivent être délicates et attentionnées.",
    celebrities: [
      { name: "Chanel", age: 8 },
      { name: "Louis", age: 6 },
      { name: "Gucci", age: 4 },
      { name: "Hermès", age: 7 },
      { name: "Prada", age: 5 },
    ],
  },
  {
    id: 2,
    name: "Scottish Fold",
    description:
      "Reconnaissable à ses petites oreilles pliées vers l'avant, le Scottish Fold est un chat de taille moyenne, de constitution robuste et plutôt trapue. Les chatons viennent au monde avec les oreilles droites et ces dernières ne se plient qu'à partir de 3 ou 4 semaines d'âge. Le Scottish Fold est un excellent et agréable compagnon pour toute la famille, en raison de son caractère tranquille, discret et affectueux. Il aime aussi jouer et explorer son environnement, sans toutefois avoir tendance à s'éloigner. Les institutions félines ne sont pas toutes d'accord à propos de cette race, certaines mettant en garde contre les anomalies associées à sa particularité physique. Le Highland Fold, lui, est la variété à poil plus long. Quant aux chats de la race qui gardent les oreilles droites en grandissant, ils sont appelés Scottish Straight et Highland Straight.",
    celebrities: [
      { name: "Whiskers", age: 5 },
      { name: "Mittens", age: 4 },
      { name: "Pudding", age: 3 },
      { name: "Oreo", age: 6 },
      { name: "Marmalade", age: 7 },
    ],
  },
  {
    id: 3,
    name: "Européen",
    description:
      "L'Européen, ou European Shorthair, reprend de nombreuses caractéristiques d'un chat de gouttière classique, mais qui a bien été domestiqué avec le temps. Son entretien est des plus simples grâce à son poil court qui ne demande qu'un brossage par semaine. Son caractère est équilibré et appréciable. Il refuse simplement à partager son territoire ave des congénères. Pour le reste, il sera attachant, aimant, fidèle. Il est aussi actif et chasseur. Il s'adapte à tout type de vie. En bonus, il est doté d'une excellente santé.",
    celebrities: [
      { name: "Simba", age: 4 },
      { name: "Nala", age: 3 },
      { name: "Tigger", age: 5 },
      { name: "Felix", age: 6 },
      { name: "Garfield", age: 8 },
    ],
  },
];

const CATS_BY_ID = CATS.reduce(
  (acc, cat) => ({ ...acc, [cat.id]: cat }),
  {} as Record<number, Cat>
);

export const CATS_NAMES: Pick<Cat, "id" | "name">[] = CATS.map(
  ({ id, name }) => ({ id, name })
);

export function fetchById(catId: number) {
  return new Promise<Cat>((resolve, reject) => {
    setTimeout(
      () => {
        const cat = CATS_BY_ID[catId];
        if (catId === 3 || !cat) {
          reject("Sorry, an error occured");
        } else {
          resolve(cat);
        }
      },
      catId === 2 ? 2000 : 1000
    );
  });
}
