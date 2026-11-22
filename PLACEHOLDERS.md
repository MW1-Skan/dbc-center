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

| Placeholder                                                                             | Where it is used                                                                                          |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `[0,000+]`                                                                              | `Hero.stats.procedures.value`                                                                             |
| `[00:00–00:00]`                                                                         | `RoomsPage.pricing.tiers.fullDay.desc`                                                                    |
| `[00]`                                                                                  | `RoomsPage.stats.size.value`<br>`RoomsPage.rooms.size`                                                    |
| `[09–12]`                                                                               | `BookPage.times.morning.hours`                                                                            |
| `[12–16]`                                                                               | `BookPage.times.afternoon.hours`                                                                          |
| `[16–21]`                                                                               | `BookPage.times.evening.hours`                                                                            |
| `[4-hour]`                                                                              | `RoomsPage.pricing.tiers.halfDay.desc`                                                                    |
| `[Article title — e.g. eating in the first month after a sleeve]`                       | `Advice.items.a1`                                                                                         |
| `[Article title — e.g. getting back to exercise safely]`                                | `Advice.items.a3`                                                                                         |
| `[Article title — e.g. sleeve or bypass: how we decide]`                                | `Advice.items.a2`                                                                                         |
| `[Date]`                                                                                | `Advice.date`                                                                                             |
| `[Desk · Exam bed · Sink · Screen]`                                                     | `RoomsPage.rooms.features`                                                                                |
| `[Desk, chairs, examination bed, sink — confirm list]`                                  | `RoomsPage.included.items.furnished.desc`                                                                 |
| `[Draft for approval]`                                                                  | `Doctor.bioShort`                                                                                         |
| `[Draft for Dr. Karam's approval]`                                                      | `Doctor.bio`<br>`DoctorPage.p1`<br>`DoctorPage.p2`                                                        |
| `[EGP 0,000]`                                                                           | `RoomsPage.pricing.tiers.monthly.price`                                                                   |
| `[EGP 000]`                                                                             | `BookPage.next.fee`<br>`RoomsPage.pricing.tiers.halfDay.price`<br>`RoomsPage.pricing.tiers.fullDay.price` |
| `[emergency line]`                                                                      | `content/contact.ts`                                                                                      |
| `[First name]`                                                                          | `Stories.name`                                                                                            |
| `[Floor X]`                                                                             | `RoomsPage.stats.floor.value`                                                                             |
| `[international membership documented for 2018 — confirm current]`                      | `DoctorPage.blocks.memberships.items.asmbs.text`                                                          |
| `[membership documented for 2018 — confirm current]`                                    | `DoctorPage.blocks.memberships.items.ifso.text`                                                           |
| `[official title to be confirmed]`                                                      | `DoctorPage.blocks.appointments.items.consultant.text`                                                    |
| `[Patient quote — one or two sentences, shared with written consent.]`                  | `Stories.quote`                                                                                           |
| `[Patient quote, shared with consent.]`                                                 | `Stories.quoteShort`                                                                                      |
| `[Procedure]`                                                                           | `Stories.caption`<br>`Stories.captionShort`                                                               |
| `[Sat–Thu · 00:00–00:00]`                                                               | `Contact.hours`                                                                                           |
| `[To be confirmed by the clinic: number of days recommended before and after surgery.]` | `Faq.items.abroad.a`                                                                                      |
| `[window / no window]`                                                                  | `RoomsPage.rooms.size`                                                                                    |
| `[X days]`                                                                              | `Procedures.items.sleeve.meta`<br>`Procedures.items.bypass.meta`<br>`Procedures.items.plication.meta`     |
| `[X months]`                                                                            | `Procedures.items.balloon.meta`                                                                           |
| `[X weeks]`                                                                             | `Procedures.items.sleeve.meta`<br>`Procedures.items.bypass.meta`<br>`Procedures.items.plication.meta`     |
| `[X working days]`                                                                      | `RoomsPage.inquiry.lead`<br>`RoomsPage.inquiry.success.body`                                              |
| `[X working hours]`                                                                     | `BookPage.lead`<br>`BookPage.success.body`<br>`BookPage.next.steps.confirm.desc`                          |
| `[X]`                                                                                   | `Stories.caption`                                                                                         |

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

## Content drafted from the CV

The biography (`Doctor.bio`, `Doctor.bioShort`) is drafted from Dr. Karam's CV and starts with
"[Draft for approval]" until he signs it off. The credentials (FRCSI 1999, University Diploma in
Laparoscopic Surgery, Strasbourg 2009, Bariatric Surgery Fellowship Training at Hamad Medical
Corporation / Qatar Metabolic Institute 2023–24) and the "Since 2013" stat come from the CV. IFSO and
ASMBS memberships are documented for 2018 only and the public contact details differ from the CV;
both are kept as designed until the clinic confirms.

## Arabic copy

`messages/ar.json` is translated except for 33 medical strings, which keep the `[AR]` prefix and
show the English text on the Arabic pages until Dr. Karam supplies the Arabic:

| Keys                                             | Where it shows                                   |
| ------------------------------------------------ | ------------------------------------------------ |
| `Procedures.items.*.desc`, `.descShort`, `.meta` | Home — procedure cards and phone rows            |
| `Departments.items.*.desc`                       | Home — seven departments (desktop)               |
| `Doctor.bio`, `Doctor.bioShort`                  | Home — Meet your surgeon                         |
| `DoctorPage.p1`, `DoctorPage.p2`                 | Doctor profile — introduction                    |
| `Bmi.messages.low`, `.mid`, `.high`              | Home — BMI calculator result                     |
| `Faq.items.*.a`                                  | Home — FAQ answers (also skipped in the JSON-LD) |
| `BookPage.emergency`                             | Booking page — emergency notice                  |

`translations/doctor-review.md` lists each one with its English text, ready to send to the doctor;
`translations/GLOSSARY.md` holds the terminology. Replace each `[AR] …` value in place and keep
the key, the `{line}` placeholder and the `<strong>` tags. Placeholders inside Arabic strings are
Arabic too (e.g. `[X ساعة عمل]`, `[000 جنيه]`, `[الطابق X]`); the table above lists the English
keys only, since `scripts/placeholders.mjs` reads `messages/en.json`.

## Demo state in the design that was not reproduced

- The room-rental design shows Room 2 pre-selected and Sunday/Tuesday pre-ticked to illustrate the
  selected state. The live page starts with no room and no days selected so a visitor never submits
  a choice they did not make. The selected styles are identical to the design.
