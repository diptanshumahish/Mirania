import { Mark } from "./Logo";

/**
 * First-load veil for the homepage: the mark draws itself, then the sheet
 * lifts. Entirely CSS-driven so it always dismisses itself — a stalled script
 * can never leave a visitor staring at a blank page.
 *
 * The inline script runs during parse, before the veil paints, so a repeat
 * visit in the same tab skips it with no flash. It also shortens the hero's
 * entrance delays, since there is no longer a veil to wait behind.
 */
export default function Intro() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{var k='mirania:intro';if(sessionStorage.getItem(k)){document.documentElement.setAttribute('data-intro','seen')}else{sessionStorage.setItem(k,'1')}}catch(e){}",
        }}
      />
      <div className="intro" aria-hidden="true">
        <Mark className="intro__mark" title="" />
      </div>
    </>
  );
}
