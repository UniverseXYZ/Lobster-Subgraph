import {
  ByteArray,
  log,
  BigInt,
  Value,
  store,
  BigDecimal,
} from "@graphprotocol/graph-ts";
import {
  Contract,
  Approval,
  ApprovalForAll,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TokenMorphed,
  Transfer,
  Unpaused,
  TokenMinted,
  SecondarySaleFees,
} from "../generated/Contract/Contract";
import { TransferEntity, Trait } from "../generated/schema";

function parseGeneToTraits(gene: string, method: string): void {
  let backgroundDisitrubtion = new Map<i8, i32>();
  backgroundDisitrubtion.set(0, 1250);
  backgroundDisitrubtion.set(1, 1250);
  backgroundDisitrubtion.set(2, 1250);
  backgroundDisitrubtion.set(3, 1250);
  backgroundDisitrubtion.set(4, 1250);
  backgroundDisitrubtion.set(5, 1250);
  backgroundDisitrubtion.set(6, 1250);
  backgroundDisitrubtion.set(7, 1250);

  let skinDistribution = new Map<i8, i32>();
  skinDistribution.set(0, 1750);
  skinDistribution.set(1, 1750);
  skinDistribution.set(2, 1750);
  skinDistribution.set(3, 1500);
  skinDistribution.set(4, 750);
  skinDistribution.set(5, 500);
  skinDistribution.set(6, 400);
  skinDistribution.set(7, 350);
  skinDistribution.set(8, 300);
  skinDistribution.set(9, 250);
  skinDistribution.set(10, 175);
  skinDistribution.set(11, 150);
  skinDistribution.set(12, 125);
  skinDistribution.set(13, 100);
  skinDistribution.set(14, 65);
  skinDistribution.set(15, 50);
  skinDistribution.set(16, 25);
  skinDistribution.set(17, 10);

  let clothesDisitrubtion = new Map<i8, i32>();
  clothesDisitrubtion.set(0, 1750);
  clothesDisitrubtion.set(1, 1750);
  clothesDisitrubtion.set(2, 1500);
  clothesDisitrubtion.set(3, 1000);
  clothesDisitrubtion.set(4, 850);
  clothesDisitrubtion.set(5, 500);
  clothesDisitrubtion.set(6, 450);
  clothesDisitrubtion.set(7, 400);
  clothesDisitrubtion.set(8, 350);
  clothesDisitrubtion.set(9, 300);
  clothesDisitrubtion.set(10, 250);
  clothesDisitrubtion.set(11, 200);
  clothesDisitrubtion.set(12, 175);
  clothesDisitrubtion.set(13, 150);
  clothesDisitrubtion.set(14, 125);
  clothesDisitrubtion.set(15, 100);
  clothesDisitrubtion.set(16, 65);
  clothesDisitrubtion.set(17, 50);
  clothesDisitrubtion.set(18, 25);
  clothesDisitrubtion.set(19, 10);

  let handDistribution = new Map<i8, i32>();
  handDistribution.set(0, 1150);
  handDistribution.set(1, 1000);
  handDistribution.set(2, 1000);
  handDistribution.set(3, 850);
  handDistribution.set(4, 750);
  handDistribution.set(5, 650);
  handDistribution.set(6, 600);
  handDistribution.set(7, 550);
  handDistribution.set(8, 500);
  handDistribution.set(9, 450);
  handDistribution.set(10, 400);
  handDistribution.set(11, 350);
  handDistribution.set(12, 300);
  handDistribution.set(13, 250);
  handDistribution.set(14, 225);
  handDistribution.set(15, 200);
  handDistribution.set(16, 175);
  handDistribution.set(17, 150);
  handDistribution.set(18, 125);
  handDistribution.set(19, 100);
  handDistribution.set(20, 75);
  handDistribution.set(21, 65);
  handDistribution.set(22, 50);
  handDistribution.set(23, 25);
  handDistribution.set(24, 10);

  let headDisitrubtion = new Map<i8, i32>();
  headDisitrubtion.set(0, 750);
  headDisitrubtion.set(1, 600);
  headDisitrubtion.set(2, 600);
  headDisitrubtion.set(3, 600);
  headDisitrubtion.set(4, 600);
  headDisitrubtion.set(5, 600);
  headDisitrubtion.set(6, 600);
  headDisitrubtion.set(7, 600);
  headDisitrubtion.set(8, 600);
  headDisitrubtion.set(9, 600);
  headDisitrubtion.set(10, 600);
  headDisitrubtion.set(11, 600);
  headDisitrubtion.set(12, 600);
  headDisitrubtion.set(13, 550);
  headDisitrubtion.set(14, 400);
  headDisitrubtion.set(15, 325);
  headDisitrubtion.set(16, 250);
  headDisitrubtion.set(17, 200);
  headDisitrubtion.set(18, 150);
  headDisitrubtion.set(19, 100);
  headDisitrubtion.set(20, 50);
  headDisitrubtion.set(21, 25);

  let mouthDisitrbution = new Map<i8, i32>();
  mouthDisitrbution.set(0, 1350);
  mouthDisitrbution.set(1, 1250);
  mouthDisitrbution.set(2, 1150);
  mouthDisitrbution.set(3, 1050);
  mouthDisitrbution.set(4, 950);
  mouthDisitrbution.set(5, 850);
  mouthDisitrbution.set(6, 700);
  mouthDisitrbution.set(7, 600);
  mouthDisitrbution.set(8, 500);
  mouthDisitrbution.set(9, 450);
  mouthDisitrbution.set(10, 350);
  mouthDisitrbution.set(11, 250);
  mouthDisitrbution.set(12, 150);
  mouthDisitrbution.set(13, 100);
  mouthDisitrbution.set(14, 75);
  mouthDisitrbution.set(15, 50);
  mouthDisitrbution.set(16, 25);

  let eyesDistribution = new Map<i8, i32>();
  eyesDistribution.set(0, 1400);
  eyesDistribution.set(1, 1300);
  eyesDistribution.set(2, 1200);
  eyesDistribution.set(3, 1000);
  eyesDistribution.set(4, 850);
  eyesDistribution.set(5, 700);
  eyesDistribution.set(6, 600);
  eyesDistribution.set(7, 500);
  eyesDistribution.set(8, 450);
  eyesDistribution.set(9, 400);
  eyesDistribution.set(10, 350);
  eyesDistribution.set(11, 250);
  eyesDistribution.set(12, 200);
  eyesDistribution.set(13, 175);
  eyesDistribution.set(14, 150);
  eyesDistribution.set(15, 125);
  eyesDistribution.set(16, 100);
  eyesDistribution.set(17, 75);
  eyesDistribution.set(18, 55);
  eyesDistribution.set(19, 45);
  eyesDistribution.set(20, 35);
  eyesDistribution.set(21, 25);
  eyesDistribution.set(22, 15);

  // GENE POSITIONS MAP
  let genePositionsMap = new Map<string, i32>();
  genePositionsMap.set("BACKGROUND", 0);
  genePositionsMap.set("SKIN", 1);
  genePositionsMap.set("CLOTHES", 2);
  genePositionsMap.set("HAND", 3);
  genePositionsMap.set("HEAD", 4);
  genePositionsMap.set("MOUTH", 5);
  genePositionsMap.set("EYES", 6);

  let adjustableGenes = gene.substring(gene.length - 28); // take the last 28 digits
  let genesToArray = adjustableGenes.split("");
  let groupsLength = 7; // 28 / 4 -> We have 28 digits representing the genes, they shoud be grouped by 4 digits
  var groupedGenes = new Array<string>(groupsLength); // ["89", "88", "20", "59", "38", "45", "81", "70", "92"]
  let geneDelimeter = 4;

  // Group the genes by pairs ["8099", "1000", "2000", "5099", "3128", "4325", "4281", "1170", "9233"]
  for (
    let i: i32 = genesToArray.length - 4, j: i32 = 0;
    i >= 0;
    i -= geneDelimeter, j += 1
  ) {
    let genom = genesToArray[i]
      .concat(genesToArray[i + 1])
      .concat(genesToArray[i + 2])
      .concat(genesToArray[i + 3]);
    groupedGenes[j] = genom;
  }
  log.debug("Grouped genes: {}, {}, {}, {}, {}, {}, {}", [
    groupedGenes[0],
    groupedGenes[1],
    groupedGenes[2],
    groupedGenes[3],
    groupedGenes[4],
    groupedGenes[5],
    groupedGenes[6],
  ]);
  for (let i: i8 = 0; i < groupsLength; i += 1) {
    // THERE IS A LIMITATION ON FRONT END SIDE WE CANNOT SEND QUERYES WITH ID STARTING WITH '00' OR '0-1' so we must use prefix
    let distribution = new Map<i8, i32>();
    switch (i) {
      case 0:
        distribution = backgroundDisitrubtion;
        break;
      case 1:
        distribution = skinDistribution;
        break;
      case 2:
        distribution = clothesDisitrubtion;
        break;
      case 3:
        distribution = handDistribution;
        break;
      case 4:
        distribution = headDisitrubtion;
        break;
      case 5:
        distribution = mouthDisitrbution;
        break;
      case 6:
        distribution = eyesDistribution;
        break;
      default:
        break;
    }

    let geneItemIndex = 0;
    let counter: i32 = 0;
    let traitGene = Number.parseInt(groupedGenes[i]);

    log.info("Distribution size: {}", [
      BigInt.fromI32(distribution.size).toString(),
    ]);
    for (let q: i8 = 0; q < distribution.size; q += 1) {
      let distr = distribution.get(q);
      geneItemIndex = q;
      counter += distr;
      if (traitGene <= counter) {
        break;
      }
    }

    let prefix = "99";
    let id = prefix + i.toString() + geneItemIndex.toString(); // 9913 -> 1 is geneTypesByIndex.get(1) CHARACTER, 3 is itemIndex in that group "Glenn"

    log.info("Trait ID: {}", [id]);
    let trait = Trait.load(id);

    if (trait == null) {
      trait = new Trait(id);
    }

    if (method == "increment") {
      log.debug("DEBUG INFO:: GENE with ID {} is changing (inc) !", [id]); // When updating an Gene
      trait.count = trait.count.plus(BigInt.fromI32(1));
    } else {
      log.debug("DEBUG INFO:: GENE with ID {} is changing (dec) !", [id]); // Before updating the Graph with the new Gene info we need to substract the previous Gene info
      trait.count = trait.count.minus(BigInt.fromI32(1));
    }

    let totalItems = parseFloat("10000") as f32;
    let itemsCount = trait.count.toString();
    let itemsCountF = parseFloat(itemsCount) as f32;
    let rarity = (itemsCountF * 100) / totalItems;
    let rarityString = rarity.toString();

    trait.rarity = BigDecimal.fromString(rarityString);
    log.debug("DEBUG INFO:: GENE with ID {} rarity is changing to {} !", [
      id,
      rarity.toString(),
    ]);
    trait.save();
  }
}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTokenMinted(event: TokenMinted): void {
  log.debug("DEBUG INFO:: entering handleTokenMinted event !", []);

  let gene = event.params.newGene.toString();
  log.debug("Parsing gene: {}", [gene]);
  parseGeneToTraits(gene, "increment");
}

export function handleTokenMorphed(event: TokenMorphed): void {}

export function handleTransfer(event: Transfer): void {
  let transfer = new TransferEntity(event.params.tokenId.toHex());
  let contract = Contract.bind(event.address);

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.tokenId;

  let tokenURI = contract.tokenURI(transfer.tokenId);
  let gene = contract.geneOf(transfer.tokenId);

  transfer.tokenURI = tokenURI;
  transfer.gene = gene;

  transfer.save();
}

export function handleUnpaused(event: Unpaused): void {}

export function handleSecondarySaleFees(event: SecondarySaleFees): void {}
