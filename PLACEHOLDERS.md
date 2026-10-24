# Placeholders

Everything in `[square brackets]` on the site is a fact we do not have yet. Each one is kept
visible exactly as written in the design until the clinic supplies the value. Nothing below was
invented.

To update one, edit the message key in `messages/en.json` (and the matching key in
`messages/ar.json`) or the file in `content/`, then regenerate this table:

```bash
node scripts/placeholders.mjs
```

## Copy placeholders

| Placeholder                                                                                                                                                        | Where it is used                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `[0,000+]`                                                                                                                                                         | `Hero.stats.procedures.value`                                                                             |
| `[00:00–00:00]`                                                                                                                                                    | `RoomsPage.pricing.tiers.fullDay.desc`                                                                    |
| `[00]`                                                                                                                                                             | `Hero.stats.years.value`<br>`RoomsPage.stats.size.value`<br>`RoomsPage.rooms.size`                        |
| `[09–12]`                                                                                                                                                          | `BookPage.times.morning.hours`                                                                            |
| `[12–16]`                                                                                                                                                          | `BookPage.times.afternoon.hours`                                                                          |
| `[16–21]`                                                                                                                                                          | `BookPage.times.evening.hours`                                                                            |
| `[4-hour]`                                                                                                                                                         | `RoomsPage.pricing.tiers.halfDay.desc`                                                                    |
| `[Article title — e.g. eating in the first month after a sleeve]`                                                                                                  | `Advice.items.a1`                                                                                         |
| `[Article title — e.g. getting back to exercise safely]`                                                                                                           | `Advice.items.a3`                                                                                         |
| `[Article title — e.g. sleeve or bypass: how we decide]`                                                                                                           | `Advice.items.a2`                                                                                         |
| `[Date]`                                                                                                                                                           | `Advice.date`                                                                                             |
| `[Desk · Exam bed · Sink · Screen]`                                                                                                                                | `RoomsPage.rooms.features`                                                                                |
| `[Desk, chairs, examination bed, sink — confirm list]`                                                                                                             | `RoomsPage.included.items.furnished.desc`                                                                 |
| `[EGP 0,000]`                                                                                                                                                      | `RoomsPage.pricing.tiers.monthly.price`                                                                   |
| `[EGP 000]`                                                                                                                                                        | `BookPage.next.fee`<br>`RoomsPage.pricing.tiers.halfDay.price`<br>`RoomsPage.pricing.tiers.fullDay.price` |
| `[emergency line]`                                                                                                                                                 | `content/contact.ts`                                                                                      |
| `[First name]`                                                                                                                                                     | `Stories.name`                                                                                            |
| `[Floor X]`                                                                                                                                                        | `RoomsPage.stats.floor.value`                                                                             |
| `[Patient quote — one or two sentences, shared with written consent.]`                                                                                             | `Stories.quote`                                                                                           |
| `[Patient quote, shared with consent.]`                                                                                                                            | `Stories.quoteShort`                                                                                      |
| `[Procedure]`                                                                                                                                                      | `Stories.caption`<br>`Stories.captionShort`                                                               |
| `[Sat–Thu · 00:00–00:00]`                                                                                                                                          | `content/contact.ts`                                                                                      |
| `[Short biography — two or three sentences on Dr. Karam's background, years in practice and how he approaches each patient. Written in his own voice works best.]` | `Doctor.bio`                                                                                              |
| `[Short biography — two or three sentences.]`                                                                                                                      | `Doctor.bioShort`                                                                                         |
| `[To be confirmed by the clinic: number of days recommended before and after surgery.]`                                                                            | `Faq.items.abroad.a`                                                                                      |
| `[window / no window]`                                                                                                                                             | `RoomsPage.rooms.size`                                                                                    |
| `[X days]`                                                                                                                                                         | `Procedures.items.sleeve.meta`<br>`Procedures.items.bypass.meta`<br>`Procedures.items.plication.meta`     |
| `[X months]`                                                                                                                                                       | `Procedures.items.balloon.meta`                                                                           |
| `[X weeks]`                                                                                                                                                        | `Procedures.items.sleeve.meta`<br>`Procedures.items.bypass.meta`<br>`Procedures.items.plication.meta`     |
| `[X working days]`                                                                                                                                                 | `RoomsPage.inquiry.lead`<br>`RoomsPage.inquiry.success.body`                                              |
| `[X working hours]`                                                                                                                                                | `BookPage.lead`<br>`BookPage.success.body`<br>`BookPage.next.steps.confirm.desc`                          |
| `[X]`                                                                                                                                                              | `Stories.caption`                                                                                         |

## Photo and media placeholders

Rendered with `components/ui/ImagePlaceholder.tsx` (striped frame with a label). Replace each with
`next/image` at the same size and radius.

| Label in the design               | Where                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Photo · Dr. Karam with patient    | Home hero (`components/home/Hero.tsx`)                                                       |
| Illustration (×4)                 | Procedure cards (`components/home/Procedures.tsx`)                                           |
| Photo · The care team             | Departments (`components/home/Departments.tsx`)                                              |
| Portrait · Dr. Karam              | Meet your surgeon (`components/home/Doctor.tsx`)                                             |
| Video placeholder (×3)            | Patient stories (`components/home/Stories.tsx`)                                              |
| Photo · Room 2, Room 3, Reception | Room rental band (`components/home/RoomsBand.tsx`)                                           |
| Article image placeholder (×3)    | Medical advice (`components/home/Advice.tsx`)                                                |
| Map                               | Booking aside (`components/booking/BookingAside.tsx`)                                        |
| Photo · Reception & waiting area  | Rooms hero (`components/rooms/RoomsHero.tsx`)                                                |
| Room photo placeholder (×5)       | Room cards (`components/rooms/RoomsPicker.tsx`)                                              |
| Illustrative floor plan           | `components/rooms/RoomsPicker.tsx` — replace the tile grid with the real plan when available |

## Links that point to `#` until the pages or profiles exist

| Link                                      | Defined in                        |
| ----------------------------------------- | --------------------------------- |
| Procedure "Learn more" pages              | `content/procedures.ts`           |
| Read full profile, View certificates      | `content/credentials.ts`          |
| See all stories & videos                  | `content/stories.ts`              |
| All articles, each article                | `content/articles.ts`             |
| Open in Google Maps                       | `content/contact.ts` (`mapsHref`) |
| Facebook, Instagram, TikTok               | `content/contact.ts` (`social`)   |
| Privacy, Medical disclaimer, Rental terms | `content/contact.ts` (`legal`)    |

## Arabic copy

`messages/ar.json` contains every string prefixed with `[AR]` until a native speaker translates it.
Keep the keys, replace the values, and do not machine-translate the medical copy.

## Demo state in the design that was not reproduced

- The room-rental design shows Room 2 pre-selected and Sunday/Tuesday pre-ticked to illustrate the
  selected state. The live page starts with no room and no days selected so a visitor never submits
  a choice they did not make. The selected styles are identical to the design.
