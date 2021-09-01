import { ByteArray, log, BigInt, Value, store, BigDecimal } from '@graphprotocol/graph-ts'
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
  SecondarySaleFees
} from "../generated/Contract/Contract"
import { TransferEntity, Trait } from "../generated/schema"

function parseGeneToTraits(gene: string, method: string): void {
  // BACKGROUND MAP
  let backgroundMap = new Map<i8, string>()
  backgroundMap.set(0, "Red")
  backgroundMap.set(1, "Green")
  backgroundMap.set(2, "Blue")
  backgroundMap.set(3, "Turquoise")
  backgroundMap.set(4, "Purple")
  backgroundMap.set(5, "Yellow")
  backgroundMap.set(6, "White")
  backgroundMap.set(7, "Black")

  // SKIN MAP
  let skinMap = new Map<i8, string>()
  skinMap.set(0, "Red")
  skinMap.set(1, "Blue")
  skinMap.set(2, "Green")
  skinMap.set(3, "Albino")
  skinMap.set(4, "Pink")
  skinMap.set(5, "Reef Camo")
  skinMap.set(6, "Cow")
  skinMap.set(7, "Zebra")
  skinMap.set(8, "Tiger")
  skinMap.set(9, "Cheetah")
  skinMap.set(10, "Robot")
  skinMap.set(11, "Fluorescent")
  skinMap.set(12, "Holographic")
  skinMap.set(13, "Trippy")
  skinMap.set(14, "Galaxy")
  skinMap.set(15, "Zombie")
  skinMap.set(16, "Silver")
  skinMap.set(17, "Gold")

  // CLOTHES MAP
  let clothesMap = new Map<i8, string>()
  clothesMap.set(0, "Red Suit w/ Tie")
  clothesMap.set(1, "Blue Suit w/ Tie")
  clothesMap.set(2, "Black Suit w/ Tie")
  clothesMap.set(3, "Grey Suit w/ Tie")
  clothesMap.set(4, "White Suit w/ Tie")
  clothesMap.set(5, "Tan Suit w/ Tie")
  clothesMap.set(6, "Striped Suit w/ Tie")
  clothesMap.set(7, "Polka Dot Suit w/ Tie")
  clothesMap.set(8, "Seersucker Suit w/ Tie")
  clothesMap.set(9, "Rainbow Suit w/ Tie")
  clothesMap.set(10, "Corn Suit w/ Tie")
  clothesMap.set(11, "Sergeant Uniform")
  clothesMap.set(12, "Judge Gown")
  clothesMap.set(13, "Orange Hawaiian Shirt")
  clothesMap.set(14, "Blue Hawaiian Shirt")
  clothesMap.set(15, "Naked")
  clothesMap.set(16, "Ethereum Suit w/ Tie")
  clothesMap.set(17, "Bitcoin Suit w/ Tie")
  clothesMap.set(18, "Money Suit w/ Tie")
  clothesMap.set(19, "Gold Suit w/ Tie")

  // HAND MAP
  let handMap = new Map<i8, string>()
  handMap.set(0, "Docs")
  handMap.set(1, "Breifcase")
  handMap.set(2, "Seed Phrase")
  handMap.set(3, "The Constitution")
  handMap.set(4, "American Flag")
  handMap.set(5, "Grenade")
  handMap.set(6, "Black Smoking Gun")
  handMap.set(7, "Rainbow Briefcase")
  handMap.set(8, "Burner Phone")
  handMap.set(9, "Wireless Microphone")
  handMap.set(10, "Megaphone")
  handMap.set(11, "Blue Lollipop")
  handMap.set(12, "Green Lollipop")
  handMap.set(13, "Pink Lollipop")
  handMap.set(14, "Whiskey & Cigar")
  handMap.set(15, "Silver Gavel")
  handMap.set(16, "Silver Smoking Gun")
  handMap.set(17, "Silver Ray Gun")
  handMap.set(18, "Empty")
  handMap.set(19, "Gold Gavel")
  handMap.set(20, "Gold Smoking Gun")
  handMap.set(21, "Gold Ray Gun")
  handMap.set(22, "Corn")

  // HEAD MAP
  let headMap = new Map<i8, string>()
  headMap.set(0, "Bald")
  headMap.set(1, "Blonde Crew Cut")
  headMap.set(2, "Red Crew Cut")
  headMap.set(3, "Brunette Crew Cut")
  headMap.set(4, "Black Crew Cut")
  headMap.set(5, "Slicked Back Blonde")
  headMap.set(6, "Slicked Back Red")
  headMap.set(7, "Slicked Back Brunette")
  headMap.set(8, "Slicked Back Black")
  headMap.set(9, "Blonde Comb Over")
  headMap.set(10, "Red Comb Over")
  headMap.set(11, "Brunette Comb Over")
  headMap.set(12, "Black Comb Over")
  headMap.set(13, "Old Man Comb Over")
  headMap.set(14, "Cowboy Hat")
  headMap.set(15, "MAD Hat")
  headMap.set(16, "Queue")
  headMap.set(17, "Legally Blonde")
  headMap.set(18, "Fair Lady")
  headMap.set(19, "Yes Man")
  headMap.set(20, "Silver Crown")
  headMap.set(21, "Gold Crown")

  // MOUTH MAP
  let mouthMap = new Map<i8, string>()
  mouthMap.set(0, "Calm")
  mouthMap.set(1, "Smile")
  mouthMap.set(2, "Large Smile")
  mouthMap.set(3, "Sneaky Smile")
  mouthMap.set(4, "Game Face")
  mouthMap.set(5, "Angry Face")
  mouthMap.set(6, "Wow")
  mouthMap.set(7, "Laughing")
  mouthMap.set(8, "Tounge Stuck Out")
  mouthMap.set(9, "Chipped Teeth")
  mouthMap.set(10, "Sad")
  mouthMap.set(11, "Toothpick")
  mouthMap.set(12, "Vampire")
  mouthMap.set(13, "Rainbow Grillz")
  mouthMap.set(14, "Zombie")
  mouthMap.set(15, "Gold Grillz")
  mouthMap.set(16, "Diamond Grillz")

  // EYES MAP
  let eyesMap = new Map<i8, string>()
  eyesMap.set(0, "Open Eyes")
  eyesMap.set(1, "Bloodshot Eyes")
  eyesMap.set(2, "Aviators")
  eyesMap.set(3, "Sunglasses")
  eyesMap.set(4, "Star Shades")
  eyesMap.set(5, "Pink Shutter Shades")
  eyesMap.set(6, "White Shutter Shades")
  eyesMap.set(7, "Perscriptions")
  eyesMap.set(8, "Monocle")
  eyesMap.set(9, "Dragon Shades")
  eyesMap.set(10, "3D Glasses")
  eyesMap.set(11, "American Flag Eyes")
  eyesMap.set(12, "Bitcoin Eyes")
  eyesMap.set(13, "Ethereum Eyes")
  eyesMap.set(14, "Trippy Shades")
  eyesMap.set(15, "Heart Shades")
  eyesMap.set(16, "Money Shades")
  eyesMap.set(17, "Alien Shades")
  eyesMap.set(18, "Devil Eyes")
  eyesMap.set(19, "Glowing Eyes")
  eyesMap.set(20, "Alien Eyes")
  eyesMap.set(21, "Flaming Eyes")
  eyesMap.set(22, "Laser Eyes")

  // GENE POSITIONS MAP
  let genePositionsMap = new Map<string, i32>()
  genePositionsMap.set("BACKGROUND", 0)
  genePositionsMap.set("SKIN", 1)
  genePositionsMap.set("CLOTHES", 2)
  genePositionsMap.set("HAND", 3)
  genePositionsMap.set("HEAD", 4)
  genePositionsMap.set("MOUTH", 5)
  genePositionsMap.set("EYES", 6)

  // GENE TYPES BY INDEX MAP
  let geneTypesByIndex = new Map<i32, string>()
  geneTypesByIndex.set(0,"BACKGROUND")
  geneTypesByIndex.set(1, "SKIN")
  geneTypesByIndex.set(2, "CLOTHES" )
  geneTypesByIndex.set(3, "HAND")
  geneTypesByIndex.set(4,"HEAD")
  geneTypesByIndex.set(5, "MOUTH")
  geneTypesByIndex.set(6, "EYES")

  let itemsCountByType= new Map<string, i32>();
  itemsCountByType.set("BACKGROUND", 8)
  itemsCountByType.set("SKIN", 18)
  itemsCountByType.set("CLOTHES", 20)
  itemsCountByType.set("HAND", 23)
  itemsCountByType.set("HEAD", 22)
  itemsCountByType.set("MOUTH", 17)
  itemsCountByType.set("EYES", 23)

  let adjustableGenes = gene.substring(gene.length - 28); // take the last 28 digits
  let genesToArray = adjustableGenes.split('');
  let groupsLength = 7; // 28 / 4 -> We have 28 digits representing the genes, they shoud be grouped by 4 digits
  var groupedGenes = new Array<string>(groupsLength) // ["89", "88", "20", "59", "38", "45", "81", "70", "92"]
  let geneDelimeter = 4;

  // Group the genes by pairs ["89", "88", "20", "59", "38", "45", "81", "70", "92"]
  for (let i: i32 = genesToArray.length - 1, j: i32 = 7 - 1; i >= 0; i-= geneDelimeter, j-=1) {
    let genom = genesToArray[i-1].concat(genesToArray[i])
    groupedGenes[j] = genom;
  };

  for (let i: i32 = 0; i <= groupsLength - 1; i+= 1) {
    let geneType = geneTypesByIndex.get(i); // CHARACTER
    let geneItemsCount = itemsCountByType.get(geneType); // 11
    let geneNumber = groupedGenes[i]; // "98"
    let geneIntValue = parseInt(geneNumber) as i32;
    let itemIndex = geneIntValue % geneItemsCount; // 98 % 11 = 10
    // THERE IS A LIMITATION ON FRONT END SIDE WE CANNOT SEND QUERYES WITH ID STARTING WITH '00' OR '0-1' so we must use prefix
    let prefix = "99";
    let id = prefix + i.toString() + itemIndex.toString(); // 9913 -> 1 is geneTypesByIndex.get(1) CHARACTER, 3 is itemIndex in that group "Glenn"

    let trait = Trait.load(id);

    if (trait == null) {
      trait = new Trait(id);
    }

    if(method == 'increment') {
      log.debug('DEBUG INFO:: GENE with ID {} is changing (inc) !', [id]); // When updating an Gene
      trait.count = trait.count.plus(BigInt.fromI32(1));
    } else {
      log.debug('DEBUG INFO:: GENE with ID {} is changing (dec) !', [id]); // Before updating the Graph with the new Gene info we need to substract the previous Gene info
      trait.count = trait.count.minus(BigInt.fromI32(1));
    }

    let totalItems = parseFloat("10000") as f32;
    let itemsCount = trait.count.toString();
    let itemsCountF = parseFloat(itemsCount) as f32;
    let rarity = (itemsCountF * 100)  / totalItems;
    let rarityString = rarity.toString();

    trait.rarity = BigDecimal.fromString(rarityString);
    log.debug('DEBUG INFO:: GENE with ID {} rarity is changing to {} !', [id, rarity.toString()]);
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
  log.debug('DEBUG INFO:: entering handleTokenMinted event !', []);

  let gene = event.params.newGene.toString();
  parseGeneToTraits(gene, 'increment');
}

export function handleTokenMorphed(event: TokenMorphed): void {}

export function handleTransfer(event: Transfer): void {
  let transfer = new TransferEntity(event.params.tokenId.toHex());
  let contract = Contract.bind(event.address)

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.tokenId;

  let tokenURI = contract.tokenURI(transfer.tokenId);

  transfer.tokenURI = tokenURI;


  transfer.save();
}

export function handleUnpaused(event: Unpaused): void {}

export function handleSecondarySaleFees(event: SecondarySaleFees): void {}
